import { IUser } from './model/user';
import { IWallet } from './model/wallet';
import { IMovementList } from './model/movementList';
import { JSONFile, Low } from '@commonify/lowdb';

interface Schema {
    users: IUser[];
    wallets: IWallet[];
    movementLists: IMovementList[];
}

export const DATABASE_DEFAULT = {
    users: [],
    wallets: [],
    movementLists: [],
};

export let db: Low<Schema>;

export async function initDB() {
    let dbFileName;
    switch (process.env.NODE_ENV) {
        case 'testing':
            dbFileName = 'testingDB';
            break;
        case 'dev':
            dbFileName = 'devDB';
            break;
        case 'prod':
            dbFileName = 'prodDB';
            break;
        default:
            dbFileName = 'lostDB';
            break;
    }
    let path = __dirname.split('\\');
    path.pop();
    path.push('database');
    const pathString = `${path.join('\\')}\\${dbFileName}.json`;
    const adapter = new JSONFile<Schema>(pathString);
    db = new Low(adapter);
    await db.read();
    if (!db.data) {
        db.data = DATABASE_DEFAULT;
    }
    await db.write();
}





