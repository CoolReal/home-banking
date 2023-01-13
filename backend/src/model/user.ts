import {v4 as uuidv4} from 'uuid'

export interface IUser {
    id: string;
    email: string;
    password: string;
    name?: string;
}

export class User implements IUser{
    id: string;
    email: string;
    password: string;
    name?: string;
    constructor(email: string, password: string) {
        this.id = uuidv4();
        this.email = email;
        this.password = password;
    }
}
