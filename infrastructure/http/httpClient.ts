import { Router, RequestHandler, Express } from 'express';


export interface RouterAdapter {
  get(path: string, ...handlers: any[]): this;
  post(path: string, ...handlers: any[]): this;
  put(path: string, ...handlers: any[]): this;
  delete(path: string, ...handlers: any[]): this;
  use(...args: any[]): this;
  raw(): unknown;
  mount(app: unknown, path: string): void;
}

export class HttpClient implements RouterAdapter {
  private router;
  constructor() { this.router = Router(); }

  get(path: string, ...handlers: RequestHandler[]) { this.router.get(path, ...handlers); return this; }
  post(path: string, ...handlers: RequestHandler[]) { this.router.post(path, ...handlers); return this; }
  put(path: string, ...handlers: RequestHandler[]) { this.router.put(path, ...handlers); return this; }
  delete(path: string, ...handlers: RequestHandler[]) { this.router.delete(path, ...handlers); return this; }
  use(...args: Parameters<Router['use']>) { this.router.use(...args); return this; }

  raw() { return this.router; }

  mount(app: Express, path: string) { app.use(path, this.router); }
}