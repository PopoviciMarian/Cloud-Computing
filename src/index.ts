
import { Logging } from "./utils/logging";
import http from "http";
import config from "./utils/config";
import { IncomingMessage, ServerResponse } from "http";
import productRouter from "./modules/product/product.route";
import { connectToDb } from "./utils/db";
import { checkPrefix } from "./utils/util_functions";

export const NAMESPACE = 'Server';
Logging.debug(NAMESPACE, "Starting application");


const startServer = async () => {
    await connectToDb();

    const serverFunc = async (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        Logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        if (checkPrefix(req, `/api/${config.API_VERSION}/product`)) {
            await productRouter.callRoute(req, res);
        } else {
            productRouter.reject(res);
        }

        res.on('finish', () => {
            Logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
    }
    const server = http.createServer(serverFunc);


    server.listen(config.PORT, () => {
        Logging.info(NAMESPACE, `Server started on port ${config.PORT}`);
    });
}

startServer();