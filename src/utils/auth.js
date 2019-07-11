import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { globalConfig } from '../configs'


export const signToken = (data) => {
    const options = {
        expiresIn: '24 hours'
    }
    return jwt.sign(data, globalConfig.sessionToken, options);
}

export const verifyToken = (token) => {
    return jwt.verify(token, globalConfig.sessionToken);
}

export const hashPassword = (plainPsw) => {
    return bcrypt.hash(plainPsw, 10)
}

export const comparePassword = (plainPsw, hashedPsw) => {
    return bcrypt.compare(plainPsw, hashedPsw);
}

export const authUser = (request, authRequired = true) => {
    const tokenHeader = request.request != null
        ? request.request.headers.authorization
        : request.connection.context.Authorization;

    if (tokenHeader != null) {
        const token = tokenHeader.replace('Bearer ', '');
        return verifyToken(token);
    }

    if (authRequired === true) throw new Error('Authorization required!');
}

export default {
    signToken,
    verifyToken,
    hashPassword,
    comparePassword,
    authUser
}