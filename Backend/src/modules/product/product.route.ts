import express from 'express';
import { createProduct, getProduct, modifyProduct , replaceProduct, deleteProduct} from "./product.controller";

const productRouter =  express.Router();

productRouter.post("/", createProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", replaceProduct);
productRouter.patch("/:id", modifyProduct);
productRouter.delete("/:id", deleteProduct);


export default productRouter;