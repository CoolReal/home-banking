import { randomUUID } from 'crypto';

export interface IMovement {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    transactionValue: number;
    walletOriginId?: string;
    walletDestinationId?: string;
}

export class Movement implements IMovement {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    transactionValue: number;
    walletDestinationId?: string;
    walletOriginId?: string;

    constructor(
        date: string,
        description: string,
        transactionValue: number,
        walletDestinationId?: string,
        walletOriginId?: string
    ) {
        this.id = randomUUID();
        this.createdAt = new Date(Date.now()).toISOString();
        this.updatedAt = new Date(Date.now()).toISOString();
        this.description = description;
        this.transactionValue = transactionValue;
        this.walletDestinationId = walletDestinationId;
        this.walletOriginId = walletOriginId;
    }
}
