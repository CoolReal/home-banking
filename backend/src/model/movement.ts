import { randomUUID } from 'crypto';
import { currentDateAsUTCString } from '../utils';

enum MovementType {
    INTERNAL = 'INTERNAL',
    EXTERNAL = 'EXTERNAL',
}

export interface IMovement {
    id: string;
    type: MovementType;
    createdAt: string;
    description: string;
    transactionValue: string;
    newWalletValue: string;
    walletOriginId?: string;
    walletDestinationId?: string;
}

export class Movement implements IMovement {
    id: string;
    type: MovementType;
    createdAt: string;
    description: string;
    transactionValue: string;
    newWalletValue: string;
    walletDestinationId?: string;
    walletOriginId?: string;

    private constructor(
        description: string,
        transactionValue: string,
        newWalletValue: string,
        type: MovementType,
        walletOriginId?: string,
        walletDestinationId?: string
    ) {
        this.id = randomUUID();
        this.createdAt = currentDateAsUTCString();
        this.description = description;
        this.transactionValue = transactionValue;
        this.newWalletValue = newWalletValue;
        this.type = type;
        this.walletDestinationId = walletDestinationId;
        this.walletOriginId = walletOriginId;
    }

    static createInternalMovement(
        description: string,
        transactionValue: string,
        newWalletValue: string
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
        transactionValue: string,
        newWalletValue: string,
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
