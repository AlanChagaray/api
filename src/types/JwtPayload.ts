import { User } from "./User";

export interface JwtPayload {
    idusuario : number;
    usuario   : string;
    idrol     : number;
    rol       : string;
    id_tenant : number;
    empresa   : string;
}