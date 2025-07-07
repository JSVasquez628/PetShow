import { Link } from "react-router-dom";
import { Product_List } from "../components/Product_List";

export function ProductoPage() {
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Link to="/producto-create" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear Producto
        </Link>
      </div>
      <Product_List />
    </div>
  )
}

