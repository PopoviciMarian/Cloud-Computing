
import { Logging } from "./utils/logging";
import http from "http";
import config from "./utils/config";
import productRouter from "./modules/product/product.route";
import { connectToDb } from "./utils/db";
import sellerRouter from "./modules/seller/seller.route";
import express from 'express';
import bodyParser from 'body-parser';
import { validatePhoneNumber } from "./modules/phoneValidation/phoneValidation.service";


export const NAMESPACE = 'Server';
Logging.debug(NAMESPACE, "Starting application");


const router = express();
router.use((req, res, next) => {
    /** Log the req */
    Logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        Logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); 
        return res.status(200).json({});
    }

    next();
});


router.use(`/api/${config.API_VERSION}/products`, productRouter);
router.use(`/api/${config.API_VERSION}/sellers`, sellerRouter);


router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});


const httpServer = http.createServer(router);
httpServer.listen(config.PORT, () => Logging.info(NAMESPACE, `Server running on ${config.HOST}:${config.PORT}`));

connectToDb()
