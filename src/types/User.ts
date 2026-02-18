export interface User {
  id              : number;
  username        : string;
  first_name      : string;
  last_name       : string;
  email           : string;
  password        : string;
  id_role         : number;
  active          : number;
  id_tenant       : number;
  tenant_name     : string;
}

export interface SearchParams {
  idusuario       ?: number;
  id              ?: string;
  first_name      ?: string;
  last_name       ?: string;
  username        ?: string;
  email           ?: string;
  password        ?: string;
  id_role         ?: number;
  id_tenant       : number;
}

export interface Login {
  id        : number;
  username  : string;
  password  : string;
  id_role   : number;
  id_tenant : number;
}

export interface Register {
  username    : string;
  first_name  : string;
  last_name   : string;
  email       : string;
  id_role     : number;
}

export type UserList = User[];
export interface Users { Users: UserList; }