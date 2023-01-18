import * as jwt from 'jsonwebtoken';

/**
 * Creates new JWT token with data as payload
 * @param data payload
 */
export function sign(data: any) {
    return jwt.sign(data, <string>process.env.JWT_SECRET_KEY);
}
