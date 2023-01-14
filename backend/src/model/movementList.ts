import { Movement } from './movement';
import { randomUUID } from 'crypto';
import { currentDateAsString } from '../utils';

export interface IMovementList {
    id: string;
    walletId: string;
    createdAt: string;
    updatedAt: string;
    movements: Movement[];
}

export class MovementList implements IMovementList {
    id: string;
    walletId: string;
    createdAt: string;
    updatedAt: string;
    movements: Movement[];

    constructor(walletId: string) {
        this.id = randomUUID();
        this.walletId = walletId;
        this.createdAt = currentDateAsString();
        this.updatedAt = this.createdAt;
        this.movements = [];
    }
}
