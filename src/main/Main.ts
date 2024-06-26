import { Configuration } from './Configuration.interface';
import { DataService } from '../data/DataService.interface';
import { StorageService } from '../storage/Storage.interface';
import { ProcessService } from '../process/ProcessService.interface';
import { MessengerService } from '../messenger/MessengerService.interface';

const MAX_MINIMAL_CHANGE = 5;
const MIN_MINIMAL_CHANGE = 1;
const MAX_MESSAGE_LENGTH = 4095;

export class Main {
    constructor(
        private readonly configuration: Configuration,
        private readonly dataService: DataService,
        private readonly storageService: StorageService,
        private readonly processService: ProcessService,
        private readonly messengerService: MessengerService
    ) {}

    async sendMessage(): Promise<void> {
        const newData = await this.dataService.getData();
        const oldData = await this.storageService.getData();

        let message;

        for (let i = MAX_MINIMAL_CHANGE; i > MIN_MINIMAL_CHANGE; i--) {
            const processedMessage = this.processService.formatMessage({
                newData,
                oldData,
                minimalChange: i,
            });

            if (!message || processedMessage.length <= MAX_MESSAGE_LENGTH) {
                message = processedMessage;
            } else {
                break;
            }
        }

        console.log(`${message}\n${message && message.length}`);

        await this.messengerService.sendMessage({
            chatId: this.configuration.channelId,
            text: message,
        });

        if (!this.configuration.isDevMode) {
            await this.storageService.setData(newData);
        }
    }
}
