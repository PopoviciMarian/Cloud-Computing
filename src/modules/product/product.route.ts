import Router from "../../utils/router";
import { createProduct, getProduct, modifyProduct , replaceProduct, deleteProduct} from "./product.controller";

const productRouter = new Router();

productRouter.post("/", createProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", replaceProduct);
productRouter.patch("/:id", modifyProduct);
productRouter.delete("/:id", deleteProduct);


export default productRouter;