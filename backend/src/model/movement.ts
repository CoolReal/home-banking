export interface IMovement {
    id: string;
    description: string;
    walletOriginId: string;
    walletDestinationId: string;
    transactionValue: Number;
}

//TODO
export class Movement implements IMovement {
    description: string;
    id: string;
    transactionValue: Number;
    walletDestinationId: string;
    walletOriginId: string;

    constructor(
        description: string,
        id: string,
        transactionValue: Number,
        walletDestinationId: string,
        walletOriginId: string
    ) {
        this.description = description;
        this.id = id;
        this.transactionValue = transactionValue;
        this.walletDestinationId = walletDestinationId;
        this.walletOriginId = walletOriginId;
    }
}
