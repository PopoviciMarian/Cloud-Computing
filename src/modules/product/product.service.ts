import { ProductModel } from "./product.model"


export const createProductHelper = async (body: any) => {
    try {
        const newProduct = new ProductModel(body);
        return await newProduct.save();
    } catch (e: any) {
        if (e.code === 11000) {
            throw "Product already exists"
        }
        else if (e.name === "ValidationError") {
            throw "Invalid body"
        }
        else {
            throw e
        }
    }
}


export const getProductHelper = async (id: any) => {
    try {
        return await ProductModel.findById(id);
    } catch (e: any) {
        throw e
    }
}

export const modifyProductHelper = async (params: any, body: any) => {
    try {
        return await ProductModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    } catch (e: any) {
        throw e
    }
}