import { User } from "./User";

export interface HttpRequest {
  params: any;
  query: Record<string, string | undefined>;
  token : string;
  body: any;
  headers: Record<string, string | undefined>;
  user ?: User | any;
}