import { IncomingMessage, ServerResponse } from "http";
import { getBody, getPathParams } from "../../utils/util_functions";
import { ProductModel } from "./product.model"


export const createProductHelper = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = getBody(req);
        if (body._id !== undefined) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, _id is not allowed" }));
            return;
        }
        const newProduct = new ProductModel(body);
        return await newProduct.save();
    } catch (e: any) {
        if (e.name === "ValidationError") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body" }));
            return;
        }
        else {
            throw e
        }
    }
}


export const getProductHelper = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const id = getPathParams(req).id;
        const product = await ProductModel.findById(id);
        if (product === null) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }   
        return product;
    } catch (e: any) {
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }
        if(e.name === "ValidationError"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params" }));
            return;
        }
        throw e
    }
}


export const replaceProductHelper = async (req : IncomingMessage, res: ServerResponse) => {
    try {
        const params = getPathParams(req);
        const newBody = getBody(req);
        if (newBody._id !== undefined) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, _id is not allowed" }));
            return;
        }
        if(params.id === undefined){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params, id is required" }));
            return;
        }
        const product = await ProductModel.findById(params.id);
        if (product === null) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }

        // check if body contains all required fields dinamically, eliminating  fields that are not required
        const requiredFields = Object.keys(ProductModel.schema.obj);
        const bodyFields = Object.keys(newBody);
        const missingFields = requiredFields.filter(field => !bodyFields.includes(field));
        if(missingFields.length > 0 && missingFields[0] !== "seller"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Invalid body, missing fields: ${missingFields}` }));
            return;
        }


        const newProduct = ProductModel.findOneAndReplace({_id: params.id}, newBody, {new: true});
        return newProduct;
    } catch (e: any) {
        if (e.name === "ValidationError") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body" }));
            return;
        }
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }
        else {
            throw e
        }
    }
}

        

export const modifyProductHelper = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const params = getPathParams(req);
        const body = getBody(req);
        if (body._id !== undefined) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, _id is not allowed" }));
            return;
        }
        if(params.id === undefined){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params, id is required" }));
            return;
        }
        return await ProductModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    } catch (e: any) {
        if (e.name === "ValidationError") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body" }));
            return;
        }
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }

        throw e
    }
}

export const deleteProductHelper = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const params = getPathParams(req);
        if(params.id === undefined){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params, id is required" }));
            return;
        }
        const response = await ProductModel.findOneAndDelete({ _id: params.id });
        if (response === null) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }
        return response;
    } catch (e: any) {
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
            return;
        }
        throw e
    }
}