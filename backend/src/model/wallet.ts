import { randomUUID } from 'crypto';
import { currentDateAsUTCString } from '../utils';

export interface IWallet {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    funds: string;
}

export class Wallet implements IWallet {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    funds: string;

    constructor(userId: string) {
        this.id = randomUUID();
        this.userId = userId;
        this.createdAt = currentDateAsUTCString();
        this.updatedAt = this.createdAt;
        this.funds = "0.00";
    }
}
