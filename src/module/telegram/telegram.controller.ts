import { Controller, Post, Body, Get, Param, Query, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { TelegramService, SendMessageDto, TelegramUpdate } from './telegram.service';

@Controller('telegram')
export class TelegramController {
    private readonly logger = new Logger(TelegramController.name);

    constructor(private readonly telegramService: TelegramService) { }

    // Your existing endpoints
    @Get('bot-info')
    async getBotInfo() {
        return await this.telegramService.getBotInfo();
    }

    @Post('send-message')
    async sendMessage(@Body() sendMessageDto: SendMessageDto) {
        return await this.telegramService.sendMessage(sendMessageDto);
    }

    @Post('send-notification/:chatId')
    async sendNotification(
        @Param('chatId') chatId: string,
        @Body('message') message: string,
    ) {
        return await this.telegramService.sendMessage({
            chatId,
            message: message || 'Hello from NestJS Telegram Bot!',
        });
    }

    @Post('broadcast')
    async broadcastMessage(
        @Body('chatIds') chatIds: string[],
        @Body('message') message: string,
    ) {
        return await this.telegramService.sendMessageToMultipleChats(chatIds, message);
    }

    // Example endpoint that triggers a telegram message
    @Post('alert/:type')
    async sendAlert(
        @Param('type') type: string,
        @Query('chatId') chatId: string,
        @Body() data: any,
    ) {
        let message = '';

        switch (type) {
            case 'error':
                message = `🚨 <b>Error Alert</b>\n\n${data.message || 'An error occurred'}`;
                break;
            case 'success':
                message = `✅ <b>Success</b>\n\n${data.message || 'Operation completed successfully'}`;
                break;
            case 'warning':
                message = `⚠️ <b>Warning</b>\n\n${data.message || 'Warning message'}`;
                break;
            case 'info':
                message = `ℹ️ <b>Information</b>\n\n${data.message || 'Information message'}`;
                break;
            default:
                message = `📢 <b>Notification</b>\n\n${data.message || 'Generic notification'}`;
        }

        if (!chatId) {
            throw new Error('chatId query parameter is required');
        }

        return await this.telegramService.sendMessage({
            chatId,
            message,
            parseMode: 'HTML',
        });
    }

    // New webhook endpoints for handling /login command
    /**
     * Webhook endpoint to receive updates from Telegram
     */
    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async handleWebhook(@Body() update: TelegramUpdate): Promise<{ status: string }> {
        try {
            this.logger.log('Received webhook update: ', JSON.stringify(update, null, 2));

            await this.telegramService.handleWebhookUpdate(update);

            return { status: 'ok' };
        } catch (error) {
            this.logger.error('Error handling webhook:', error);
            return { status: 'error' };
        }
    }

    /**
     * Endpoint to set webhook URL
     */
    @Post('set-webhook')
    async setWebhook(@Body() body: { url: string }): Promise<any> {
        try {
            const result = await this.telegramService.setWebhook(body.url);
            return {
                success: true,
                message: 'Webhook set successfully',
                data: result
            };
        } catch (error) {
            this.logger.error('Failed to set webhook:', error);
            throw error;
        }
    }

    /**
     * Endpoint to delete webhook
     */
    @Post('delete-webhook')
    async deleteWebhook(): Promise<any> {
        try {
            const result = await this.telegramService.deleteWebhook();
            return {
                success: true,
                message: 'Webhook deleted successfully',
                data: result
            };
        } catch (error) {
            this.logger.error('Failed to delete webhook:', error);
            throw error;
        }
    }

    /**
     * Endpoint to get webhook info
     */
    @Get('webhook-info')
    async getWebhookInfo(): Promise<any> {
        try {
            const result = await this.telegramService.getWebhookInfo();
            return {
                success: true,
                data: result
            };
        } catch (error) {
            this.logger.error('Failed to get webhook info:', error);
            throw error;
        }
    }

    /**
     * Start polling for local development (alternative to webhook)
     */
    @Post('start-polling')
    async startPolling(): Promise<any> {
        try {
            // First delete webhook to enable polling
            await this.telegramService.deleteWebhook();

            // Start polling in background
            this.telegramService.startPolling();

            return {
                success: true,
                message: 'Polling started successfully '
            };
        } catch (error) {
            this.logger.error('Failed to start polling:', error);
            throw error;
        }
    }
}