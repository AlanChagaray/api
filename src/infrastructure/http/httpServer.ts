import express, { Express, Router, RequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export class HttpServer {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.setupDefaults();
  }

  private setupDefaults() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  public mount(path: string, router: Router): void {
    this.app.use(path, router);
  }

  public use(middleware: RequestHandler): void {
    this.app.use(middleware);
  }

  public listen(port: string, cb?: () => void): void {
    this.app.listen(port, cb);
  }

  public getInstance(): Express {
    return this.app;
  }
}
