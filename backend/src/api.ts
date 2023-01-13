import {Request, ResponseToolkit} from "@hapi/hapi";
import {DATABASE_DEFAULT, db} from './database'
import {User} from "./model/user";
import {Wallet} from "./model/wallet";
import {MovementList} from "./model/movementList";

export async function databaseReset(request: Request, h: ResponseToolkit) {
    db.data = DATABASE_DEFAULT
    await db.write();
    console.log("Database clear")
    return h.response().code(200);
}


export async function subscribe(request: Request, h: ResponseToolkit) {
    const newUser = JSON.parse(<string>request.payload)
    await db.read();
    if (await db.data?.users.some(user => user.email === newUser.email)) {
        return h.response({feedback: "This email is already in use."}).code(409)
    }
    const user = new User(newUser.email, newUser.password);
    const wallet = new Wallet(user.id)
    const movementList = new MovementList(wallet.id)
    db.data?.users.push(user)
    db.data?.wallets.push(wallet)
    db.data?.movementLists.push(movementList)
    await db.write();
    return h.response({feedback: "Account created successfully"}).code(200);
}

export async function login(request: Request, h: ResponseToolkit) {
    const {email, password} = JSON.parse(<string>request.payload)
    await db.read();
    if (!db.data) {
        return h.response({feedback: "Database error"}).code(500);
    }
    const user = db.data.users.filter(user => user.email === email);
    if (user.length === 0) {
        return h.response({feedback: "This account does not exist"}).code(404)
    }
    if (user[0].password !== password) {
        return h.response({feedback: "Incorrect credentials"}).code(401)
    }
    return h.response({feedback: "Login successful"}).code(200);
}

export async function getFunds(request: Request, h: ResponseToolkit) {
    console.log(request.payload)
    return h.response("getFunds").code(200);
}

export async function addFunds(request: Request, h: ResponseToolkit) {
    console.log(request.payload)
    return h.response("addFunds").code(200);
}

export async function removeFunds(request: Request, h: ResponseToolkit) {
    console.log(request.payload)
    return h.response("removeFunds").code(200);
}
