import { randomUUID } from 'crypto';
import { currentDateAsUTCString } from '../utils';

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

    constructor(email: string, password: string, name?: string) {
        this.id = randomUUID();
        this.email = email;
        this.name = name?.trim();
        this.createdAt = currentDateAsUTCString();
        this.updatedAt = this.createdAt;
        this.password = password;
    }
}
