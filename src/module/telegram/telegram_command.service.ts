
// telegram-command.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramCommandService {
    getStartResponse(): string {
        return 'Welcome to your NestJS Telegram bot!';
    }

    getHelloResponse(): string {
        return 'Hello from NestJS!';
    }
}