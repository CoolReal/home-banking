import Hapi from '@hapi/hapi';
import { Server } from '@hapi/hapi';
import * as api from './api';
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
                exposedHeaders: ['Authorization'],
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
                isValid: db.data.users.some((user) => user.id === decoded.userId),
            };
        },
    });
    server.auth.default('jwt');

    if (process.env.NODE_ENV !== 'prod') {
        server.route({
            method: 'DELETE',
            path: '/delete',
            options: {
                auth: false
            },
            handler: api.databaseReset,

        });
    }

    server.route({
        method: 'POST',
        path: '/subscribe',
        options: {
            auth: false
        },
        handler: api.subscribe,
    });

    server.route({
        method: 'POST',
        path: '/login',
        options: {
            auth: false
        },
        handler: api.login,
    });

    server.route({
        method: 'GET',
        path: '/funds',
        handler: api.getFunds,
    });

    server.route({
        method: 'PUT',
        path: '/funds',
        handler: api.addFunds,
    });

    server.route({
        method: 'DELETE',
        path: '/funds',
        handler: api.removeFunds,
    });

    server.route({
        method: 'GET',
        path: '/movements',
        handler: api.getMovements,
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
