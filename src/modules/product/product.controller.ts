
import { IncomingMessage, ServerResponse } from "http";
import { getPathParams, getBody, getQueryParams } from "../../utils/util_functions";
import { createProductHelper, getProductHelper, modifyProductHelper } from "./product.service";


export const createProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = getBody(req);
        const newProduct = await createProductHelper(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newProduct));
    } catch (e) {
        console.log(e);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: e }));
    }
}

export const getProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const params = getPathParams(req);
        const product = await getProductHelper(params.id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
    } catch (e) {
        console.log(e);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: e }));
    }
}


export const modifyProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const params = getPathParams(req);
        const body = getBody(req);
        const product = await modifyProductHelper(params.id, body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
    } catch (e) {
        console.log(e);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: e }));
    }
}