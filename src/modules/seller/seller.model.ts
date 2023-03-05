

import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose';


// Seller Model
/**
 * name: string
 * email: string
 * password: string
 * phone: string
 * products: string[]
 */

@modelOptions({ schemaOptions: { collection: 'sellers' } })
export class Seller {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true })
    phone: string;
}

export const SellerModel = getModelForClass(Seller);