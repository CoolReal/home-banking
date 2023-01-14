import { randomUUID } from 'crypto';
import { currentDateAsString } from '../utils';

export interface IUser {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    lastLogin?: string;
    name?: string;
}

export class User implements IUser {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    lastLogin?: string;
    name?: string;

    constructor(email: string, password: string) {
        this.id = randomUUID();
        this.email = email;
        this.createdAt = currentDateAsString();
        this.updatedAt = this.createdAt;
        this.password = password;
    }
}
