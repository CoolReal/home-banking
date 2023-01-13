import {Movement} from "./movement";
import {v4 as uuidv4} from 'uuid'


export interface IMovementList {
    id: string;
    walletId: string
    movements: Movement[]
}

export class MovementList implements IMovementList {
    id: string;
    walletId: string;
    movements: Movement[];

    constructor(walletId: string) {
        this.id = uuidv4();
        this.walletId = walletId;
        this.movements = []
    }
}
