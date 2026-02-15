import TenantModel from '../models/tenantModel';

export async function getByName(name: string) {
  return await TenantModel.getByName(name);
}

export async function createTenant(name: string) {
  return await TenantModel.post(name);
}
