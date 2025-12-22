export interface User {
    idusuario   ?: string;
    usuario     ?: string;
    email       ?: string;
    createdAt   ?: Date;
    updatedAt   ?: Date;
}

export interface Users {
    users       : User[];
}