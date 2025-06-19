import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface SendMessageDto {
    chatId: string;
    message: string;
    parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}

export interface TelegramUpdate {
    update_id: number;
    message?: {
        message_id: number;
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
        };
        chat: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            type: string;
        };
        date: number;
        text?: string;
    };
}

export interface UserInfo {
    telegramId: number;
    firstName: string;
    lastName?: string;
    username?: string;
    chatId: number;
    languageCode?: string;
}

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name);
    private readonly botToken: string;
    private readonly telegramApiUrl: string;
    private readonly userEndpoint: string;

    constructor(private configService: ConfigService) {
        const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

        if (!token) {
            this.logger.error('TELEGRAM_BOT_TOKEN is not set in environment variables');
            throw new Error('TELEGRAM_BOT_TOKEN is required but not provided');
        }

        this.botToken = token;
        this.telegramApiUrl = `https://api.telegram.org/bot${this.botToken}`;

        // Configure your endpoint URL here
        this.userEndpoint = this.configService.get<string>('USER_INFO_ENDPOINT') || 'http://localhost:2000/api/v1/products';
    }

    async sendMessage(sendMessageDto: SendMessageDto): Promise<any> {
        try {
            const { chatId, message, parseMode = 'HTML' } = sendMessageDto;

            const response = await axios.post(`${this.telegramApiUrl}/sendMessage`, {
                chat_id: chatId,
                text: message,
                parse_mode: parseMode,
            });

            this.logger.log(`Message sent successfully to chat ${chatId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Failed to send message:', error.response?.data || error.message);
            throw new Error(`Failed to send Telegram message: ${error.response?.data?.description || error.message}`);
        }
    }

    async sendMessageToMultipleChats(chatIds: string[], message: string): Promise<any[]> {
        const promises = chatIds.map(chatId =>
            this.sendMessage({ chatId, message })
        );

        try {
            const results = await Promise.allSettled(promises);
            return results;
        } catch (error) {
            this.logger.error('Failed to send messages to multiple chats:', error);
            throw error;
        }
    }

    async getBotInfo(): Promise<any> {
        try {
            const response = await axios.get(`${this.telegramApiUrl}/getMe`);
            return response.data;
        } catch (error) {
            this.logger.error('Failed to get bot info:', error.response?.data || error.message);
            throw new Error(`Failed to get bot info: ${error.response?.data?.description || error.message}`);
        }
    }

    /**
     * Handle incoming webhook updates from Telegram
     */
    async handleWebhookUpdate(update: TelegramUpdate): Promise<void> {
        try {
            if (!update.message) {
                return;
            }

            const { message } = update;
            const chatId = message.chat.id.toString();
            const text = message.text?.trim();

            this.logger.log(`Received message: "${text}" from chat ${chatId}`);

            // Handle /login command
            if (text === '/login') {
                await this.handleLoginCommand(message);
            }
            // Handle /start command
            else if (text === '/start') {
                await this.handleStartCommand(chatId);
            }
            // Handle other commands or messages
            else {
                if (text == null) return;
                await this.handleGenericMessage(chatId, text);
            }

        } catch (error) {
            this.logger.error('Error handling webhook update:', error);
        }
    }

    /**
     * Handle /login command - extract user info and call your endpoint
     */
    private async handleLoginCommand(message: any): Promise<void> {
        const startTime = Date.now();
        const chatId = message.chat.id.toString();

        // Enhanced logging - log the incoming message first
        this.logger.log('=== LOGIN COMMAND RECEIVED ===');
        this.logger.log(`Timestamp: ${new Date().toISOString()}`);
        this.logger.log(`Raw Message Object:`, JSON.stringify(message, null, 2));

        // Enhanced UserInfo with validation
        const userInfo: UserInfo = {
            telegramId: message.from?.id,
            firstName: message.from?.first_name || 'Unknown',
            lastName: message.from?.last_name || null,
            username: message.from?.username || null,
            chatId: message.chat?.id,
            languageCode: message.from?.language_code || null
        };

        // Log extracted user information
        this.logger.log('=== EXTRACTED USER INFO ===');
        this.logger.log(`Telegram ID: ${userInfo.telegramId}`);
        this.logger.log(`First Name: ${userInfo.firstName}`);
        this.logger.log(`Last Name: ${userInfo.lastName || 'Not provided'}`);
        this.logger.log(`Username: ${userInfo.username ? '@' + userInfo.username : 'Not set'}`);
        this.logger.log(`Chat ID: ${userInfo.chatId}`);
        this.logger.log(`Language Code: ${userInfo.languageCode || 'Not detected'}`);
        this.logger.log(`Chat Type: ${message.chat?.type || 'Unknown'}`);

        // Additional user context logging
        if (message.from) {
            this.logger.log('=== ADDITIONAL USER CONTEXT ===');
            this.logger.log(`Is Bot: ${message.from.is_bot || false}`);
            this.logger.log(`Is Premium: ${message.from.is_premium || false}`);
            this.logger.log(`Added to Attachment Menu: ${message.from.added_to_attachment_menu || false}`);
        }

        // Message context logging
        this.logger.log('=== MESSAGE CONTEXT ===');
        this.logger.log(`Message ID: ${message.message_id}`);
        this.logger.log(`Message Date: ${new Date(message.date * 1000).toISOString()}`);
        this.logger.log(`Message Text: "${message.text || 'No text'}"`);

        // Validation checks
        const validationErrors: string[] = [];
        if (!userInfo.telegramId) validationErrors.push('Missing Telegram ID');
        if (!userInfo.firstName) validationErrors.push('Missing First Name');
        if (!userInfo.chatId) validationErrors.push('Missing Chat ID');

        if (validationErrors.length > 0) {
            this.logger.error('=== VALIDATION ERRORS ===');
            validationErrors.forEach(error => this.logger.error(`❌ ${error}`));

            await this.sendMessage({
                chatId,
                message: `❌ Login failed due to missing user information. Please try again.`,
                parseMode: 'HTML'
            });
            return;
        }

        try {
            this.logger.log('=== STARTING LOGIN PROCESS ===');

            // Log the complete userInfo object being processed
            this.logger.log('Final UserInfo object:', JSON.stringify(userInfo, null, 2));

            // Send user info to your endpoint (currently commented out)
            this.logger.log('Preparing to send user info to endpoint...');
            // const response = await this.sendUserInfoToEndpoint(userInfo);
            // this.logger.log('Endpoint response:', JSON.stringify(response, null, 2));

            // Construct welcome message with available information
            const displayName = userInfo.username
                ? `@${userInfo.username}`
                : `${userInfo.firstName}${userInfo.lastName ? ' ' + userInfo.lastName : ''}`;

            const welcomeMessage = `✅ Login successful! Welcome ${displayName}!\n\n` +
                `📋 Your information:\n` +
                `• Telegram ID: <code>${userInfo.telegramId}</code>\n` +
                `• Name: ${userInfo.firstName}${userInfo.lastName ? ' ' + userInfo.lastName : ''}\n` +
                `• Username: ${userInfo.username ? '@' + userInfo.username : 'Not set'}\n` +
                `• Language: ${userInfo.languageCode?.toUpperCase() || 'Not detected'}\n` +
                `• Chat ID: <code>${userInfo.chatId}</code>\n\n` +
                `🕐 Login time: ${new Date().toLocaleString()}\n` +
                `Your information has been processed successfully.`;

            // Send success message back to user
            await this.sendMessage({
                chatId,
                message: welcomeMessage,
                parseMode: 'HTML'
            });
            // await this.sendMessage({
            //     chatId: "1415543660",
            //     message: welcomeMessage,
            //     parseMode: 'HTML'
            // });

            // Success logging
            const processingTime = Date.now() - startTime;
            this.logger.log('=== LOGIN SUCCESS ===');
            this.logger.log(`✅ User ${userInfo.telegramId} (${displayName}) logged in successfully`);
            this.logger.log(`Processing time: ${processingTime}ms`);
            this.logger.log(`Success message sent to chat ${chatId}`);
            this.logger.log('=== LOGIN PROCESS COMPLETED ===\n');

        } catch (error) {
            // Enhanced error logging
            const processingTime = Date.now() - startTime;
            this.logger.error('=== LOGIN FAILURE ===');
            this.logger.error(`❌ Failed to process login for user ${userInfo.telegramId}`);
            this.logger.error(`User: ${userInfo.firstName} ${userInfo.lastName || ''} (@${userInfo.username || 'no-username'})`);
            this.logger.error(`Chat ID: ${chatId}`);
            this.logger.error(`Processing time before error: ${processingTime}ms`);
            this.logger.error(`Error type: ${error.constructor.name}`);
            this.logger.error(`Error message: ${error.message}`);

            // Log full error stack if available
            if (error.stack) {
                this.logger.error(`Error stack trace:`);
                this.logger.error(error.stack);
            }

            // Log additional error context
            if (error.response) {
                this.logger.error(`HTTP Response Status: ${error.response.status}`);
                this.logger.error(`HTTP Response Data:`, JSON.stringify(error.response.data, null, 2));
            }

            // Send error message back to user
            await this.sendMessage({
                chatId,
                message: `❌ Login failed. Please try again later or contact support.\n\n` +
                    `Error ID: <code>${Date.now()}</code>\n` +
                    `Time: ${new Date().toLocaleString()}`,
                parseMode: 'HTML'
            });

            this.logger.error('=== ERROR RECOVERY COMPLETED ===\n');
        }
    }

    // Optional: Add a helper method for structured logging
    private logUserActivity(action: string, userInfo: UserInfo, additionalData?: any): void {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action,
            user: {
                telegramId: userInfo.telegramId,
                name: `${userInfo.firstName} ${userInfo.lastName || ''}`.trim(),
                username: userInfo.username,
                chatId: userInfo.chatId,
                languageCode: userInfo.languageCode
            },
            additionalData
        };

        this.logger.log(`USER_ACTIVITY: ${JSON.stringify(logEntry)}`);
    }

    // Optional: Add method to log system metrics
    private logSystemMetrics(): void {
        const memUsage = process.memoryUsage();
        this.logger.log('=== SYSTEM METRICS ===');
        this.logger.log(`Memory Usage (RSS): ${Math.round(memUsage.rss / 1024 / 1024)} MB`);
        this.logger.log(`Memory Usage (Heap Used): ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`);
        this.logger.log(`Memory Usage (Heap Total): ${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`);
        this.logger.log(`Uptime: ${Math.round(process.uptime())} seconds`);
    }

    /**
     * Send user information to your endpoint
     */
    private async sendUserInfoToEndpoint(userInfo: UserInfo): Promise<any> {
        try {
            const response = await axios.post(this.userEndpoint, {
                telegram_id: userInfo.telegramId,
                first_name: userInfo.firstName,
                last_name: userInfo.lastName,
                username: userInfo.username,
                chat_id: userInfo.chatId,
                language_code: userInfo.languageCode,
                login_timestamp: new Date().toISOString()
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${this.configService.get('API_TOKEN')}`
                }
            });

            this.logger.log(`User info sent to endpoint successfully for user ${userInfo.telegramId}`);
            return response.data;

        } catch (error) {
            this.logger.error('Failed to send user info to endpoint:', error.response?.data || error.message);
            throw new Error(`Failed to send user info: ${error.response?.data || error.message}`);
        }
    }

    /**
     * Handle /start command
     */
    private async handleStartCommand(chatId: string): Promise<void> {
        const welcomeMessage = `
🤖 <b>Welcome to our Bot!</b>

Available commands:
• /login - Login and register your account
• /start - Show this welcome message

To get started, please use the /login command.
        `;

        await this.sendMessage({
            chatId,
            message: welcomeMessage.trim(),
            parseMode: 'HTML'
        });
    }

    /**
     * Handle other messages
     */
    private async handleGenericMessage(chatId: string, text: string): Promise<void> {
        if (!text) return;

        const response = `
I received your message: "${text}"

Please use available commands:
• /login - Login to your account
• /start - Show welcome message
        `;

        await this.sendMessage({
            chatId,
            message: response.trim(),
            parseMode: 'HTML'
        });
    }

    /**
     * Set webhook URL for receiving updates
     */
    async setWebhook(webhookUrl: string): Promise<any> {
        try {
            const response = await axios.post(`${this.telegramApiUrl}/setWebhook`, {
                url: webhookUrl,
                allowed_updates: ['message']
            });

            this.logger.log(`Webhook set successfully to: ${webhookUrl}`);
            return response.data;

        } catch (error) {
            this.logger.error('Failed to set webhook:', error.response?.data || error.message);
            throw new Error(`Failed to set webhook: ${error.response?.data?.description || error.message}`);
        }
    }

    /**
     * Delete webhook
     */
    async deleteWebhook(): Promise<any> {
        try {
            const response = await axios.post(`${this.telegramApiUrl}/deleteWebhook`);
            this.logger.log('Webhook deleted successfully');
            return response.data;

        } catch (error) {
            this.logger.error('Failed to delete webhook:', error.response?.data || error.message);
            throw new Error(`Failed to delete webhook: ${error.response?.data?.description || error.message}`);
        }
    }

    /**
     * Get webhook info
     */
    async getWebhookInfo(): Promise<any> {
        try {
            const response = await axios.get(`${this.telegramApiUrl}/getWebhookInfo`);
            return response.data;

        } catch (error) {
            this.logger.error('Failed to get webhook info:', error.response?.data || error.message);
            throw new Error(`Failed to get webhook info: ${error.response?.data?.description || error.message}`);
        }
    }

    /**
     * Get updates using polling (for local development)
     */
    async getUpdates(offset?: number): Promise<any> {
        try {
            const response = await axios.get(`${this.telegramApiUrl}/getUpdates`, {
                params: {
                    offset,
                    timeout: 30,
                    allowed_updates: ['message']
                }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Failed to get updates:', error.response?.data || error.message);
            throw new Error(`Failed to get updates: ${error.response?.data?.description || error.message}`);
        }
    }

    /**
     * Start polling for updates (for local development)
     */
    async startPolling(): Promise<void> {
        let offset = 0;

        this.logger.log('Starting polling for Telegram updates...');

        while (true) {
            try {
                const result = await this.getUpdates(offset);

                if (result.ok && result.result.length > 0) {
                    for (const update of result.result) {
                        await this.handleWebhookUpdate(update);
                        offset = update.update_id + 1;
                    }
                }

                // Small delay to prevent hitting rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                this.logger.error('Error in polling:', error);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }
}