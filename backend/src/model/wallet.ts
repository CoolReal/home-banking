import { v4 as uuidv4 } from 'uuid';

export interface IWallet {
    id: string;
    userId: string;
    funds: Number;
}

export class Wallet implements IWallet {
    id: string;
    userId: string;
    funds: Number;

    constructor(userId: string) {
        this.id = uuidv4();
        this.userId = userId;
        this.funds = 0;
    }
}
