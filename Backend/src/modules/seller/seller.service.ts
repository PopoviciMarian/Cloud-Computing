
import { Request, Response } from "express";
import { validatePhoneNumber } from "../phoneValidation/phoneValidation.service";
import { ProductModel } from "../product/product.model";
import { getRandomProducts } from "../productGenerator/productGenerator.service";
import { SellerModel } from "./seller.model";


const getBody = (req: Request) => {
    return req.body;
}

const getPathParams = (req: Request) => {
    return req.params;
}

export const createSellerHelper = async (req: Request, res: Response) => {
    try {
        const body = getBody(req);
        if (body._id !== undefined) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, _id is not allowed" }));
            return;
        }
        if(body.phone === undefined || body.email === undefined || body.password === undefined){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, phone, email and password are required" }));
            return;
        }

        const vpn = await validatePhoneNumber(body.phone);
        
        if(vpn.valid === false){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: vpn.message }));
            return;
        }

        
        const newSeller = new SellerModel(body);
        // add 10 products to the seller
        const products = await getRandomProducts(10);
        console.log("🚀 ~ file: seller.service.ts:43 ~ createSellerHelper ~ products:", products)
        for(const product of products){
            product.seller = newSeller._id;
            await ProductModel.create(product);


        }

        return await newSeller.save();
    } catch (e: any) {
        //  duplicate key error
        if (e.code === 11000) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid body, duplicate key, this email is already in use" }));
            return;
        }

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

export const getSellerHelper = async (req: Request, res: Response) => {
    try{
        let seller = undefined;
        if(req.params.id === null){
            const id = getPathParams(req).id;
            seller = await SellerModel.findById(id);
        }
        else if (getBody(req).password !== undefined && getBody(req).email !== undefined) {
          
            seller = await SellerModel.findOne({ email: getBody(req).email, password: getBody(req).password });
        }

        if (seller === null) {
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

export const replaceSellerHelper = async (req : Request, res: Response) => {
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


export const updateSellerHelper = async (req : Request, res: Response) => {
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

export const deleteSellerHelper = async (req : Request, res: Response) => {
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

export const getSellerProductsHelper = async (req : Request, res: Response) => {
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
        return await ProductModel.find({seller: seller._id}).sort({_id: -1});
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



    
