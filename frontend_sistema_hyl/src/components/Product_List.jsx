import { useEffect, useState } from "react";
import { getAllProducto } from "../api/product.api";
import { ProductoCard } from "./productoCard";  

export function Product_List() {
  const [productos, setProduct] = useState([]);

  useEffect(() =>{
    async function loadProducto() {
        const res = await getAllProducto();
        setProduct(res.data);
    }
    loadProducto();
  }, []);

  return <div>
    {productos.map(producto => (
      <ProductoCard key={producto.id} producto={producto} />
    ))}
  </div>
}

