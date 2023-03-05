
/**
 * [POST] /sellers
 * [GET] /sellers/:id
 * [PUT] /sellers/:id
 * [PATCH] /sellers/:id
 * [DELETE] /sellers/:id
 * [GET] /sellers/:id/products
 */


import Router from "../../utils/router";
import {createSeller, getSeller , replaceSeller, modifySeller, deleteSeller, getSellerProducts} from "./seller.controller";

const sellerRouter = new Router();

sellerRouter.post("/", createSeller);
sellerRouter.get("/:id", getSeller);
sellerRouter.put("/:id", replaceSeller);
sellerRouter.patch("/:id", modifySeller);
sellerRouter.delete("/:id", deleteSeller);
sellerRouter.get("/:id/products", getSellerProducts);


export default sellerRouter;