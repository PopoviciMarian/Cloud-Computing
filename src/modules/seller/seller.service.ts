

import { IncomingMessage, ServerResponse } from "http";
import { getBody, getPathParams } from "../../utils/util_functions";
import { ProductModel } from "../product/product.model";
import { SellerModel } from "./seller.model";

export const createSellerHelper = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = getBody(req);
        if (body._id !== undefined) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, _id is not allowed" }));
            return;
        }
        const newSeller = new SellerModel(body);
        return await newSeller.save();
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

export const getSellerHelper = async (req: IncomingMessage, res: ServerResponse) => {
    try{
        const id = getPathParams(req).id;
        const seller = await SellerModel.findById(id);
        if(seller === null){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        return seller;

    }
    catch(e: any){
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        if(e.name === "ValidationError"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params" }));
            return;
        }
        else{
            throw e
        }
    }


}

export const replaceSellerHelper = async (req : IncomingMessage, res: ServerResponse) => {
    try{
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
        const seller = await SellerModel.findById(params.id);
       
        if(seller === null){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }

        const requiredFields = ["name", "email", "password", "phone"];
        for (const field of requiredFields) {
            if (newBody[field] === undefined) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: `Invalid body, ${field} is required` }));
                return;
            }
        }

        const newSeller = await SellerModel.findOneAndReplace({_id: params.id}, newBody, {new: true});
        return newSeller;
    }catch(e: any){
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        if(e.name === "ValidationError"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params" }));
            return;
        }
        else{
            throw e
        }
    }
}


export const updateSellerHelper = async (req : IncomingMessage, res: ServerResponse) => {
    try{
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
        const response = await SellerModel.findByIdAndUpdate(params.id, body);
        if(response === null){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        return response;
    }catch(e: any){
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        if(e.name === "ValidationError"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params" }));
            return;
        }
        else{
            throw e
        }
    }
}

export const deleteSellerHelper = async (req : IncomingMessage, res: ServerResponse) => {
    try{
        const params = getPathParams(req);
        if(params.id === undefined){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params, id is required" }));
            return;
        }
        await ProductModel.deleteMany({seller: params.id});
        const response = await SellerModel.findByIdAndDelete(params.id);
        if(response === null){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        return response;
    }catch(e: any){
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        if(e.name === "ValidationError"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params" }));
            return;
        }
        else{
            throw e
        }
    }
}

export const getSellerProductsHelper = async (req : IncomingMessage, res: ServerResponse) => {
    try{
        const params = getPathParams(req);
        if(params.id === undefined){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params, id is required" }));
            return;
        }
        const seller = await SellerModel.findById(params.id);
        if(seller === null){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        return await ProductModel.find({seller: seller._id});
    }catch(e: any){
        if(e.name === "CastError"){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Seller not found" }));
            return;
        }
        if(e.name === "ValidationError"){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid params" }));
            return;
        }
        else{
            throw e
        }
    }
}



    
