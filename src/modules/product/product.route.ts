import Router from "../../utils/router";
import { createProduct, getProduct, modifyProduct } from "./product.controller";

const productRouter = new Router();

productRouter.get("/:id", getProduct);
productRouter.post("/", createProduct);
productRouter.put("/:id", modifyProduct);


export default productRouter;