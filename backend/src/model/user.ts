import { randomUUID } from 'crypto';

export interface IUser {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    name?: string;
}

export class User implements IUser {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    name?: string;

    constructor(email: string, password: string, name?: string) {
        this.id = randomUUID();
        this.email = email;
        this.createdAt = new Date(Date.now()).toISOString();
        this.updatedAt = new Date(Date.now()).toISOString();
        this.password = password;
        this.name = name;
    }
}
