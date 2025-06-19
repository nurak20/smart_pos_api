import { Context } from 'telegraf';

export interface TelegramContext extends Context {
    session?: any;
}