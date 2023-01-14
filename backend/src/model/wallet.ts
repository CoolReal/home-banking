import { randomUUID } from 'crypto';

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
        this.createdAt = new Date(Date.now()).toISOString();
        this.updatedAt = new Date(Date.now()).toISOString();
        this.funds = 0;
    }
}
