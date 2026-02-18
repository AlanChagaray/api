import RoleModel from '../models/roleModel';

interface Role {
    id: number;
    name: string;
    description: string;
    id_tenant: number;
}

// export async function search({ name, description, id_state, id_category , id_tenant}: any) : Promise<Product[] | null> {
//     return await ProductModel.search(name, description, id_state, id_category, id_tenant);
// }

// export async function getById(id: number, id_tenant: number) : Promise<Product | null> {
//     return await ProductModel.getById(id, id_tenant);
// }

export async function post({ name, description, id_tenant }: any) : Promise<Role> {
    return await RoleModel.post(name, description, id_tenant);
}

// export async function remove(id: number, id_tenant: number) {
//     return await ProductModel.remove(id, id_tenant);
// }

// export async function update({id, name = null, description = null, cost = null, price = null, id_state = null, id_category = null, id_tenant }: any): Promise<User | null> {
//     return await ProductModel.put(id, name, description, cost, price, id_state, id_category, id_tenant);
// }

