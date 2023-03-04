
import { IncomingMessage, ServerResponse } from "http";

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

type Route = {
    path: string;
    method: typeof methods[number];
    controller: (req: IncomingMessage, res: ServerResponse) => void;
}


class Router {
    routes: Route[];
    constructor() {
        this.routes = [];
    }

    get(path: string, controller: (req: IncomingMessage, res: ServerResponse) => void) {
        this.routes.push({ path, method: 'GET', controller });
    }
    post(path: string, controller: (req: IncomingMessage, res: ServerResponse) => void) {
        this.routes.push({ path, method: 'POST', controller });
    }
    put(path: string, controller: (req: IncomingMessage, res: ServerResponse) => void) {
        this.routes.push({ path, method: 'PUT', controller });
    }
    delete(path: string, controller: (req: IncomingMessage, res: ServerResponse) => void) {
        this.routes.push({ path, method: 'DELETE', controller });
    }
    patch(path: string, controller: (req: IncomingMessage, res: ServerResponse) => void) {
        this.routes.push({ path, method: 'PATCH', controller });
    }

    reject(res: any) {
        res.writeHead(404);
        res.write('Not found');
        res.end();
    }

    async callRoute(req: IncomingMessage, res: ServerResponse) {
        let body = '';
        for await (const chunk of req) {
            body += chunk;
        }

        const route = this.routes.filter(r => r.method === req.method).find(r => {
            const path = r.path.split('/');
            const reqPath = req.url?.split('/');
            if (path.length !== reqPath?.length) {
                return false;
            }
            for (let i = 0; i < path.length; i++) {
                if (path[i] !== reqPath[i] && !path[i].startsWith(':')) {
                    return false;
                }
            }
            let params: Record<string, string> = {};
            for (let i = 0; i < path.length; i++) {
                if (path[i].startsWith(':')) {
                    params[path[i].substring(1)] = reqPath![i];
                }
            }

            req.rawHeaders.push(`params=${JSON.stringify(params)}`);
            req.rawHeaders.push(`body=${body}`);
            return true;
        });


        if (route) {
            route.controller(req, res);
        } else {
            this.reject(res);
        }
    }

}

export default Router;