import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

// Product Model
/**
 * name: string
 * description: string 
 * price: number
 * productImage: string
 * seller: string
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

    @prop({ required: false })
    seller: string;
}

export const ProductModel = getModelForClass(Product);

