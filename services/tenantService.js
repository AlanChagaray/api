import TenantModel from '../models/tenantModel.js';

export async function createTenant(empresa) {
    return await TenantModel.post(empresa);
}

export async function getByName(empresa) {
    return await TenantModel.getByName(empresa);
}
