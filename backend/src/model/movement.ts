import { randomUUID } from 'crypto';
import { currentDateAsString } from '../utils';

enum MovementType {
    INTERNAL = 'INTERNAL',
    EXTERNAL = 'EXTERNAL',
}

export interface IMovement {
    id: string;
    type: MovementType;
    createdAt: string;
    updatedAt: string;
    description: string;
    transactionValue: number;
    newWalletValue: number;
    walletOriginId?: string;
    walletDestinationId?: string;
}

export class Movement implements IMovement {
    id: string;
    type: MovementType;
    createdAt: string;
    updatedAt: string;
    description: string;
    transactionValue: number;
    newWalletValue: number;
    walletDestinationId?: string;
    walletOriginId?: string;

    private constructor(
        description: string,
        transactionValue: number,
        newWalletValue: number,
        type: MovementType,
        walletOriginId?: string,
        walletDestinationId?: string
    ) {
        this.id = randomUUID();
        this.createdAt = currentDateAsString();
        this.updatedAt = this.createdAt;
        this.description = description;
        this.transactionValue = transactionValue;
        this.newWalletValue = newWalletValue;
        this.type = type;
        this.walletDestinationId = walletDestinationId;
        this.walletOriginId = walletOriginId;
    }

    static createInternalMovement(
        description: string,
        transactionValue: number,
        newWalletValue: number
    ) {
        return new Movement(
            description,
            transactionValue,
            newWalletValue,
            MovementType.INTERNAL
        );
    }

    static createExternalMovement(
        description: string,
        transactionValue: number,
        newWalletValue: number,
        walletOriginId?: string,
        walletDestinationId?: string
    ) {
        return new Movement(
            description,
            transactionValue,
            newWalletValue,
            MovementType.EXTERNAL,
            walletOriginId,
            walletDestinationId
        );
    }
}
