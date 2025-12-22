import Cliente from '../models/clienteModel.js';

export async function search(req, res) {
  const { nombre, apellido, telefono } = req.query;
  try {
      const response = await Cliente.search({ nombre, apellido, telefono });
      return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al buscar clientes.' });
  }
}

export async function getById(req, res) {
  const { idcliente } = req.params;
  try {
    const cliente = await Cliente.get(idcliente);
    return res.json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al obtener cliente.' });
  }
}

export async function post(req, res) {
  const cliente = req.body;
  try {
    const response = await Cliente.post(cliente);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Error al crear cliente.' });
  }
}

export async function put(req, res) {
  const cliente = await req.body;
  try {
    const response = await Cliente.put(cliente);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Error al editar cliente.' });
  }
}

export async function deleteById(req, res) {
  const {idcliente} = req.params;
  try {
    const response = await Cliente.delete(idcliente);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(400).json({ message: 'Error al eliminar cliente.' });
  }
}
