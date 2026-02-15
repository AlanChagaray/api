export interface HttpResponse {
    status : (code: number) => HttpResponse;
    headers: Record<string, string>;
    json: (body: any) => HttpResponse;
    cookie: (name: string, value: string, options: any) => void;
} 