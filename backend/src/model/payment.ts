import { IInternalMovement, InternalMovement } from './internalMovement';

export interface IPayment extends IInternalMovement {
    entity: string;
    reference: string;
}

export class Payment extends InternalMovement implements IPayment {
    entity: string;
    reference: string;

    constructor(
        entity: string,
        reference: string,
        transactionValue: string,
        newWalletValue: string,
        description?: string
    ) {
        super(transactionValue, newWalletValue, description);
        this.entity = entity;
        this.reference = reference;
    }
}
