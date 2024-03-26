import { Data } from '../common/model/Data.interface';

export interface ProcessService {
    formatMessage({
        newData,
        oldData,
        minimalChange,
    }: {
        newData: Data;
        oldData: Data;
        minimalChange: number;
    }): string;
}
