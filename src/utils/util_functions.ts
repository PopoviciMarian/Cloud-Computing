import { IncomingMessage } from 'http';
import { NAMESPACE } from '..';
import { Logging } from './logging';

export type Error = {
    message: string,
    name: string,
    code: number
}

export const getQueryParams = (req: IncomingMessage) => {
    try {
        const params = req.rawHeaders[req.rawHeaders.length - 3].split('=')[1];
        return JSON.parse(params);
    }
    catch (e) {
        Logging.error(NAMESPACE, "getQueryParams", e);
        const error:Error = {
            name: "ValidationError",
            message: "Invalid query params",
            code : 400
        }
        throw error;
    }


}

export const getPathParams = (req: IncomingMessage) => {
    try {
        const params = req.rawHeaders[req.rawHeaders.length - 2].split(/=(.*)/s)[1];
        return JSON.parse(params);
    }
    catch (e) {
        Logging.error(NAMESPACE, "getPathParams", e);
        
        const error:Error = {
            name: "ValidationError",
            message: "Invalid path params",
            code : 400
        }
    }
}

export const getBody = (req: IncomingMessage) => {
    try {
        const body = req.rawHeaders[req.rawHeaders.length - 1].split('=')[1];
        return JSON.parse(body);
    }
    catch (e) {
        Logging.error(NAMESPACE, "getBody", e);
        const error:Error = {
            name: "ValidationError",
            message: "Invalid body",
            code : 400
        }
        throw error;
    }
}

export const checkPrefix = (req: IncomingMessage, prefix: string) => {
    if (req.url && req.url.startsWith(prefix)) {
        req.url = req.url.substring(prefix.length);
        return true;
    }
    return false;
}
