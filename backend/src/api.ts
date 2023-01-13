import {Request, ResponseToolkit} from "@hapi/hapi";
import {DATABASE_DEFAULT, db} from './database'

export async function databaseReset(request: Request, h: ResponseToolkit) {
    db.data = DATABASE_DEFAULT
    await db.write();
    console.log("Database clear")
    return h.response().code(200);
}


export async function subscribe(request: Request, h: ResponseToolkit) {
    return h.response({feedback: "Account created successfully"}).code(200);
}

export async function login(request: Request, h: ResponseToolkit) {
    console.log(request.payload)
    return h.response("login").code(200);
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
