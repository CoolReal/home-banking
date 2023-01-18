import { Request, ResponseToolkit } from '@hapi/hapi';
import { DATABASE_DEFAULT, db } from '../database';

/**
 * <p>(DEV) Route | DELETE:delete</p>
 * <p>Resets DEV database</p>
 */
export async function databaseReset(request: Request, h: ResponseToolkit) {
    db.data = DATABASE_DEFAULT;
    await db.write();
    console.log('Database clear');
    return h.response().code(200);
}
