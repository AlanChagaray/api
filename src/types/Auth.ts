export interface Auth {
    success     ?: boolean;
    status      : number;
    idusuario   ?: string | number | any;
    usuario     ?: string;
    idrol       ?: number;
    rol         ?: string;
    id_tenant   ?: number;
    empresa     ?: string;
    token       ?: string;
    message     ?: string;
}
