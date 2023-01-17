import { IInternalMovement, InternalMovement } from './internalMovement';

export interface IRecipientData {
    recipientEmail?: string;
    recipientName?: string;
}

export interface ITransfer extends IInternalMovement, IRecipientData {
    originWalletId: string;
    recipientWalletId: string;
}

export class Transfer extends InternalMovement implements ITransfer {
    originWalletId: string;
    recipientWalletId: string;
    recipientEmail?: string;
    recipientName?: string;

    constructor(
        originWalletId: string,
        recipientWalletId: string,
        description: string,
        transactionValue: string,
        newWalletValue: string,
        recipientData: IRecipientData
    ) {
        super(transactionValue, newWalletValue, description);
        this.originWalletId = originWalletId;
        this.recipientWalletId = recipientWalletId;
        this.recipientEmail = recipientData.recipientEmail;
        this.recipientName = recipientData.recipientName;
    }
}
