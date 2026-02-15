export interface User {
  idusuario       : number;
  id              : string;
  nombre          : string;
  apellido        : string;
  usuario         : string;
  email           : string;
  password        : string;
  idrol           : number;
  rol             : string;
  activo          : number;
  empresa         : string;
  id_tenant       : number;
  fechaAlta       : Date;
  fechaModificacion: Date;
}

export interface SearchParams {
  idusuario       ?: number;
  id              ?: string;
  nombre          ?: string;
  apellido        ?: string;
  usuario         ?: string;
  email           ?: string;
  password        ?: string;
  rol             ?: string;
  idrol           ?: number;
  empresa         ?: string;
  id_tenant       : number;
}

export interface Login {
  idusuario: number;
  usuario  : string;
  password : string;
  rol      : string;
  id_tenant: number;
  empresa  : string;
}

export interface Register {
  nombre    : string;
  apellido  : string;
  usuario   : string;
  email     : string;
  idrol     : number;
}

export type UserList = User[];
export interface Users { Users: UserList; }