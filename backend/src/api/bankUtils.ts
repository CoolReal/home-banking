import { currentDateAsUTCString } from '../utils';
import { db, Schema } from '../database';
import { IMovementList } from '../model/movementList';
import { IWallet } from '../model/wallet';

export function updateMovementList(walletMovementList: IMovementList) {
    walletMovementList.updatedAt = currentDateAsUTCString();
    const movementListIndex = (<Schema>db.data).movementLists.findIndex(
        (temp) => temp.id === walletMovementList.id
    );
    (<Schema>db.data).movementLists[movementListIndex] = walletMovementList;
}

export function updateWallet(wallet: IWallet) {
    wallet.updatedAt = currentDateAsUTCString();
    const walletIndex = (<Schema>db.data).wallets.findIndex(
        (temp) => temp.id === wallet.id
    );
    (<Schema>db.data).wallets[walletIndex] = wallet;
}
