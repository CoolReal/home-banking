import { Request, ResponseToolkit } from '@hapi/hapi';
import { DATABASE_DEFAULT, db } from './database';
import { User } from './model/user';
import { Wallet } from './model/wallet';
import { MovementList } from './model/movementList';
import * as jwtUtils from './jwtUtils';
import { addValues, currentDateAsUTCString, setDecimalPlaces } from './utils';
import { Movement } from './model/movement';
import * as bcrypt from 'bcrypt';

export async function databaseReset(request: Request, h: ResponseToolkit) {
    db.data = DATABASE_DEFAULT;
    await db.write();
    console.log('Database clear');
    return h.response().code(200);
}

export async function subscribe(request: Request, h: ResponseToolkit) {
    const newUser = <any>request.payload;
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    if (db.data.users.some((user) => user.email === newUser.email)) {
        return h
            .response({ feedback: 'This email is already in use.' })
            .code(409);
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    const user = new User(newUser.email, hashedPassword, newUser.name);
    const wallet = new Wallet(user.id);
    const movementList = new MovementList(wallet.id);
    db.data.users.push(user);
    db.data.wallets.push(wallet);
    db.data.movementLists.push(movementList);
    await db.write();
    return h.response({ feedback: 'Account created successfully' }).code(200);
}

export async function login(request: Request, h: ResponseToolkit) {
    const { email, password } = <any>request.payload;
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const user = db.data.users.find((user) => user.email === email);
    if (!user) {
        return h
            .response({ feedback: 'This account does not exist' })
            .code(404);
    }
    if (!await bcrypt.compare(password, user.password)) {
        return h.response({ feedback: 'Incorrect credentials' }).code(401);
    }
    const token = jwtUtils.sign({ userId: user.id });
    user.lastLogin = currentDateAsUTCString();
    const responseUser: any = { ...user };
    delete responseUser.password;
    await db.write();
    return h
        .response({ feedback: 'Login successful', user: responseUser })
        .code(200)
        .header('Authorization', token);
}

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
    walletMovementList.movements.unshift(
        Movement.createInternalMovement(
            'Deposited funds',
            transactionValue,
            wallet.funds
        )
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
    walletMovementList.movements.unshift(
        Movement.createInternalMovement(
            'Withdrew funds',
            setDecimalPlaces(-parseFloat(transactionValue)),
            wallet.funds
        )
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
