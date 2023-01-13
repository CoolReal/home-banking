import { Request, ResponseToolkit } from '@hapi/hapi';
import { DATABASE_DEFAULT, db } from './database';
import { User } from './model/user';
import { Wallet } from './model/wallet';
import { MovementList } from './model/movementList';
import * as jwtUtils from './jwtUtils';

export async function databaseReset(request: Request, h: ResponseToolkit) {
    db.data = DATABASE_DEFAULT;
    await db.write();
    console.log('Database clear');
    return h.response().code(200);
}

export async function subscribe(request: Request, h: ResponseToolkit) {
    const newUser = JSON.parse(<string>request.payload);
    await db.read();
    if (await db.data?.users.some((user) => user.email === newUser.email)) {
        return h
            .response({ feedback: 'This email is already in use.' })
            .code(409);
    }
    const user = new User(newUser.email, newUser.password);
    const wallet = new Wallet(user.id);
    const movementList = new MovementList(wallet.id);
    db.data?.users.push(user);
    db.data?.wallets.push(wallet);
    db.data?.movementLists.push(movementList);
    await db.write();
    return h.response({ feedback: 'Account created successfully' }).code(200);
}

export async function login(request: Request, h: ResponseToolkit) {
    const { email, password } = JSON.parse(<string>request.payload);
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const userCheck = db.data.users.filter((user) => user.email === email);
    if (userCheck.length === 0) {
        return h
            .response({ feedback: 'This account does not exist' })
            .code(404);
    }
    const user = userCheck[0];
    if (user.password !== password) {
        return h.response({ feedback: 'Incorrect credentials' }).code(401);
    }
    const token = jwtUtils.sign({ userId: user.id });
    return h
        .response({ feedback: 'Login successful' })
        .code(200)
        .header('Authorization', token);
}

export async function getFunds(request: Request, h: ResponseToolkit) {
    const { userId } = <any>jwtUtils.getPayload(request.headers.authorization);
    await db.read();
    if (!db.data) {
        return h.response({ feedback: 'Database error' }).code(500);
    }
    const walletCheck = db.data.wallets.filter(
        (wallet) => wallet.userId === userId
    );
    if (walletCheck.length === 0) {
        return h.response({ feedback: 'Wallet not found' }).code(404);
    }
    const wallet = walletCheck[0];
    return h
        .response({ feedback: 'Wallet found', funds: wallet.funds })
        .code(200);
}

export async function addFunds(request: Request, h: ResponseToolkit) {
    console.log(request.payload);
    return h.response('addFunds').code(200);
}

export async function removeFunds(request: Request, h: ResponseToolkit) {
    console.log(request.payload);
    return h.response('removeFunds').code(200);
}
