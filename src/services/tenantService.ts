import TenantModel from '../models/tenantModel';

export async function getByName(name: string) {
  return await TenantModel.getByName(name);
}

export async function createTenant(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return await TenantModel.post(name, slug);
}
