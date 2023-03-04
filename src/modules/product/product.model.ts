import { getModelForClass, prop, ReturnModelType, modelOptions, index, types } from '@typegoose/typegoose';

// Product Model
/**
 * name: string
 * seller: string
 * price: number
 * productImage: string

 * 
 */
@modelOptions({ schemaOptions: { collection: 'products' } })
export class Product {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    price: number;

    @prop({ required: true })
    productImage: string;

    @prop({ required: true })
    seller: string;
}

export const ProductModel = getModelForClass(Product);

