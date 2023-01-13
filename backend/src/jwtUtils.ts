import * as jwt from 'jsonwebtoken';

export function sign(data: any) {
    return jwt.sign(data, <string>process.env.JWT_SECRET_KEY);
}

export function getPayload(token: any) {
    return jwt.verify(token, <string>process.env.JWT_SECRET_KEY);
}
