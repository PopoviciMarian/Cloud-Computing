
import { IncomingMessage, ServerResponse } from "http";
import { Logging } from "../../utils/logging";
import { getPathParams, getBody, getQueryParams } from "../../utils/util_functions";
import { createProductHelper, deleteProductHelper, getProductHelper, modifyProductHelper, replaceProductHelper } from "./product.service";


export const createProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const newProduct = await createProductHelper(req, res);
        if(newProduct === undefined){
           return;
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newProduct));

    } catch (e) {
        Logging.error("PRODUCT", "Error creating product", e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const getProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const product = await getProductHelper(req, res);
        if(product === undefined){
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}


export const replaceProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {

    const newProduct = await replaceProductHelper(req, res);
    if(newProduct === undefined){
        return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));

    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}



export const modifyProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const product = await modifyProductHelper(req, res);
        if(product === undefined){
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const deleteProduct = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const product = await deleteProductHelper(req, res);
        if(product === undefined){
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(product));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}