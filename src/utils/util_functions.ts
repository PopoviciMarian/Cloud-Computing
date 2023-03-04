import { IncomingMessage } from 'http';
import { NAMESPACE } from '..';
import { Logging } from './logging';

export const getPathParams = (req: IncomingMessage) => {
    try {
        const params = req.rawHeaders[req.rawHeaders.length - 2].split('=')[1];
        return JSON.parse(params);
    }
    catch (e) {
        Logging.error(NAMESPACE, "getPathParams", e);
        throw "Invalid path params"
    }
}

export const getBody = (req: IncomingMessage) => {
    try {
        const body = req.rawHeaders[req.rawHeaders.length - 1].split('=')[1];
        return JSON.parse(body);
    }
    catch (e) {
        Logging.error(NAMESPACE, "getBody", e);
        throw "Invalid body"
    }
}

export const checkPrefix = (req: IncomingMessage, prefix: string) => {
    if (req.url && req.url.startsWith(prefix)) {
        req.url = req.url.substring(prefix.length);
        return true;
    }
    return false;
}