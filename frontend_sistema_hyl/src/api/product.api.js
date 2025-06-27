import axios, { Axios } from "axios";

const ProductoAPI = axios.create({
   baseURL: 'http://localhost:8000/productos/api/v1/productos'
})

const CategoriaAPI = axios.create({
   baseURL: 'http://localhost:8000/productos/api/v1/categorias'
})


//endpoints de productos
export const getAllProducto = () => ProductoAPI.get('/');

export const createProducto = (producto) =>  ProductoAPI.post('/', producto);

export const deleteProducto = (id) => 
  ProductoAPI.patch(`/${id}/`, { activo: false });

export const updateProducto = (id, producto) => 
  ProductoAPI.put(`/${id}/`, producto);

export const getProducto = (id) => 
  ProductoAPI.get(`/${id}/`);

//endpoints de categorias
export const getAllCategorias = () => CategoriaAPI.get('/');

export const createCategoria = (categoria) => CategoriaAPI.post('/', categoria);