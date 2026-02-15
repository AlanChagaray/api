import { Router , Request, Response } from "express";

type httpController = (req: Request) => Promise<Response>;

interface httpRouter {
    get    : (path: string, ...handlers: httpController[]) => void;
    post   : (path: string, ...handlers: httpController[]) => void;
    put    : (path: string, ...handlers: httpController[]) => void;
    delete : (path: string, ...handlers: httpController[]) => void;
}

export class HttpRouter implements httpRouter {
    private router: Router;

    constructor() {
        this.router = Router();
    }

    get(path: string, ...handlers: httpController[]) {
        this.router.get(path, ...handlers);
    }
    post(path: string, ...handlers: httpController[]) {
        this.router.post(path, ...handlers);
    }
    put(path: string, ...handlers: httpController[]) {
        this.router.put(path, ...handlers);
    }
    delete(path: string, ...handlers: httpController[]) {
        this.router.delete(path, ...handlers);
    }
    getRouter() {
        return this.router;
    }
}
