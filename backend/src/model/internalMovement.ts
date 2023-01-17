import { randomUUID } from 'crypto';
import { currentDateAsUTCString } from '../utils';

export interface IInternalMovement {
    id: string;
    createdAt: string;
    description?: string;
    transactionValue: string;
    newWalletValue: string;
}

export class InternalMovement implements IInternalMovement {
    id: string;
    createdAt: string;
    description?: string;
    transactionValue: string;
    newWalletValue: string;

    constructor(
        transactionValue: string,
        newWalletValue: string,
        description?: string
    ) {
        this.id = randomUUID();
        this.createdAt = currentDateAsUTCString();
        this.transactionValue = transactionValue;
        this.newWalletValue = newWalletValue;
        this.description = description;
    }
}
