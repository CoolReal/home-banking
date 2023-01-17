import { randomUUID } from 'crypto';
import { currentDateAsUTCString } from '../utils';
import { IInternalMovement } from './internalMovement';
import { IPayment } from './payment';
import { ITransfer } from './transfer';

export interface IMovementList {
    id: string;
    walletId: string;
    createdAt: string;
    updatedAt: string;
    internalMovements: IInternalMovement[];
    payments: IPayment[];
    transfers: ITransfer[];
}

export class MovementList implements IMovementList {
    id: string;
    walletId: string;
    createdAt: string;
    updatedAt: string;
    internalMovements: IInternalMovement[];
    payments: IPayment[];
    transfers: ITransfer[];

    constructor(walletId: string) {
        this.id = randomUUID();
        this.walletId = walletId;
        this.createdAt = currentDateAsUTCString();
        this.updatedAt = this.createdAt;
        this.internalMovements = [];
        this.payments = [];
        this.transfers = [];
    }
}
