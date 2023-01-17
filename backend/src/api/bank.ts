import { Request, ResponseToolkit } from '@hapi/hapi';
import * as jwtUtils from '../jwtUtils';
import { db } from '../database';
import { addValues, currentDateAsUTCString, setDecimalPlaces } from '../utils';
import { InternalMovement } from '../model/internalMovement';

export async function getFunds(request: Request, h: ResponseToolkit) {
    const { userId } = <any>jwtUtils.getPayload(request.headers.authorization);
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const wallet = db.data.wallets.find((wallet) => wallet.userId === userId);
    if (!wallet) {
        return h.response({ feedback: 'Wallet not found' }).code(404);
    }
    return h.response({ feedback: 'Wallet found', wallet: wallet }).code(200);
}

export async function addFunds(request: Request, h: ResponseToolkit) {
    const { userId } = <any>jwtUtils.getPayload(request.headers.authorization);
    const transactionValue = setDecimalPlaces((<any>request.payload).funds);

    if (parseFloat(transactionValue) <= 0) {
        return h.response({ feedback: 'Invalid transaction value' }).code(500);
    }
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const wallet = db.data.wallets.find((wallet) => wallet.userId === userId);
    if (!wallet) {
        return h.response({ feedback: 'Wallet not found' }).code(404);
    }
    wallet.funds = addValues(wallet.funds, transactionValue);
    const walletMovementList = db.data.movementLists.find(
        (list) => list.walletId === wallet.id
    );
    if (!walletMovementList) {
        return h.response({ feedback: 'Movement list not found' }).code(404);
    }
    walletMovementList.internalMovements.unshift(
        new InternalMovement(transactionValue, wallet.funds, 'Deposited funds')
    );
    walletMovementList.updatedAt = currentDateAsUTCString();
    wallet.updatedAt = walletMovementList.updatedAt;
    const movementListIndex = db.data.wallets.findIndex(
        (temp) => temp.id === walletMovementList.id
    );
    db.data.movementLists[movementListIndex] = walletMovementList;
    const walletIndex = db.data.wallets.findIndex(
        (temp) => temp.id === wallet.id
    );
    db.data.wallets[walletIndex] = wallet;
    await db.write();

    return h
        .response({ feedback: 'Added funds', funds: wallet.funds })
        .code(200);
}

export async function removeFunds(request: Request, h: ResponseToolkit) {
    const { userId } = <any>jwtUtils.getPayload(request.headers.authorization);
    const transactionValue = setDecimalPlaces((<any>request.query).funds);
    if (parseFloat(transactionValue) <= 0) {
        return h.response({ feedback: 'Invalid transaction value' }).code(500);
    }
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const wallet = db.data.wallets.find((wallet) => wallet.userId === userId);
    if (!wallet) {
        return h.response({ feedback: 'Wallet not found' }).code(404);
    }

    wallet.funds = addValues(wallet.funds, -transactionValue);
    if (parseFloat(wallet.funds) < 0) {
        return h.response({ feedback: 'Not enough funds' }).code(401);
    }
    const walletMovementList = db.data.movementLists.find(
        (list) => list.walletId === wallet.id
    );
    if (!walletMovementList) {
        return h.response({ feedback: 'Movement list not found' }).code(404);
    }
    walletMovementList.internalMovements.unshift(
        new InternalMovement(transactionValue, wallet.funds, 'Withdrew funds')
    );
    walletMovementList.updatedAt = currentDateAsUTCString();
    wallet.updatedAt = walletMovementList.updatedAt;
    const movementListIndex = db.data.wallets.findIndex(
        (temp) => temp.id === walletMovementList.id
    );
    db.data.movementLists[movementListIndex] = walletMovementList;
    const walletIndex = db.data.wallets.findIndex(
        (temp) => temp.id === wallet.id
    );
    db.data.wallets[walletIndex] = wallet;
    await db.write();

    return h
        .response({ feedback: 'Removed funds', funds: wallet.funds })
        .code(200);
}

export async function getMovements(request: Request, h: ResponseToolkit) {
    const { userId } = <any>jwtUtils.getPayload(request.headers.authorization);
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const wallet = db.data.wallets.find((wallet) => wallet.userId === userId);
    if (!wallet) {
        return h.response({ feedback: 'Wallet not found' }).code(404);
    }
    const movementList = db.data.movementLists.find(
        (list) => list.walletId === wallet.id
    );
    if (!movementList) {
        return h.response({ feedback: 'Movement list not found' }).code(404);
    }
    return h
        .response({
            feedback: 'Movement list found',
            movementList: movementList,
        })
        .code(200);
}
