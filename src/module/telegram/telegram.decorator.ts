
import { Inject } from '@nestjs/common';
import { TELEGRAM_BOT_NAME } from './telegram.constant';

export const InjectBot = () => Inject(TELEGRAM_BOT_NAME);

export const Command = (command: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const metadata = Reflect.getMetadata('bot:commands', target.constructor) || [];
        metadata.push({ command, method: propertyKey });
        Reflect.defineMetadata('bot:commands', metadata, target.constructor);
    };
};

export const Start = () => Command('start');
export const Help = () => Command('help');
export const On = (event: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const metadata = Reflect.getMetadata('bot:events', target.constructor) || [];
        metadata.push({ event, method: propertyKey });
        Reflect.defineMetadata('bot:events', metadata, target.constructor);
    };
};