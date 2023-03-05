import { IncomingMessage, ServerResponse } from "http";
import { Logging } from "../../utils/logging";
import { createSellerHelper, getSellerHelper, replaceSellerHelper, updateSellerHelper , deleteSellerHelper, getSellerProductsHelper} from "./seller.service";

export const createSeller = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const newSeller = await createSellerHelper(req, res);
        if(newSeller === undefined){
           return;
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newSeller));

    } catch (e) {
        Logging.error("SELLER", "Error creating seller", e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const getSeller = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const seller = await getSellerHelper(req, res);
        if(seller === undefined){
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(seller));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const replaceSeller = async (req: IncomingMessage, res: ServerResponse) => {
    try {

    const newSeller = await replaceSellerHelper(req, res);
    if(newSeller === undefined){
        return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newSeller));

    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const modifySeller = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const seller = await updateSellerHelper(req, res);
        if(seller === undefined){
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(seller));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const deleteSeller = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const seller = await deleteSellerHelper(req, res);
        if(seller === undefined){
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(seller));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}

export const getSellerProducts = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const seller = await getSellerProductsHelper(req, res);
        if(seller === undefined){
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(seller));
    } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong!", error: e }));
    }
}