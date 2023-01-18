import Hapi, { Server } from '@hapi/hapi';
import * as devAPI from './api/dev';
import * as accountAPI from './api/account';
import * as bankAPI from './api/bank';
import * as dotenv from 'dotenv';
import { db, initDB } from './database';

export let server: Server;

export const init = async function (): Promise<Server> {
    try {
        await initDB();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    dotenv.config({ override: false });
    server = Hapi.server({
        port: process.env.PORT || 4000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                exposedHeaders: ['Authorization'], //Allows Authorization header to be read by requests
            },
        },
    });

    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET_KEY,
        validate: async (decoded: any) => {
            await db.read();
            if (!db.data) {
                return { isValid: false };
            }
            return {
                isValid: db.data.users.some(
                    (user) => user.id === decoded.userId
                ),
                credentials: {userId: decoded.userId} //Allows endpoints to access request.auth.credentials.userId
            };
        },
    });
    server.auth.default('jwt');

    if (process.env.NODE_ENV !== 'prod') {
        server.route({
            method: 'DELETE',
            path: '/delete',
            options: {
                auth: false,
            },
            handler: devAPI.databaseReset,
        });
    }

    server.route({
        method: 'POST',
        path: '/subscribe',
        options: {
            auth: false,
        },
        handler: accountAPI.subscribe,
    });

    server.route({
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
        },
        handler: accountAPI.login,
    });

    server.route({
        method: 'GET',
        path: '/funds',
        handler: bankAPI.getFunds,
    });

    server.route({
        method: 'PUT',
        path: '/funds',
        handler: bankAPI.addFunds,
    });

    server.route({
        method: 'DELETE',
        path: '/funds',
        handler: bankAPI.removeFunds,
    });

    server.route({
        method: 'GET',
        path: '/movements',
        handler: bankAPI.getMovements,
    });

    server.route({
        method: 'GET',
        path: '/internalMovements',
        handler: bankAPI.getInternalMovements,
    });

    server.route({
        method: 'GET',
        path: '/transfers',
        handler: bankAPI.getTransfers,
    });

    server.route({
        method: 'POST',
        path: '/transfers',
        handler: bankAPI.makeTransfer,
    });

    server.route({
        method: 'GET',
        path: '/payments',
        handler: bankAPI.getPayments,
    });

    server.route({
        method: 'POST',
        path: '/payments',
        handler: bankAPI.makePayment,
    });

    return server;
};

export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection');
    console.error(err);
    process.exit(1);
});
