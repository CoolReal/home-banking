import { randomUUID } from 'crypto';
import { currentDateAsString } from '../utils';

export interface IWallet {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    funds: number;
}

export class Wallet implements IWallet {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    funds: number;

    constructor(userId: string) {
        this.id = randomUUID();
        this.userId = userId;
        this.createdAt = currentDateAsString();
        this.updatedAt = this.createdAt;
        this.funds = 0;
    }
}
