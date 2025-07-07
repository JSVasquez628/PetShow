import { useNavigate } from "react-router-dom"

export function ProductoCard({producto}) {

  const navigate = useNavigate() // Hook para navegar a otras rutas
    return (
        <div
          className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
          onClick={() => {
            navigate(`/producto/${producto.id}`) // Redirige a la página de detalle del producto 
          }}
        >
        <h1 className="text-gray-600">{producto.nombre}</h1>
        <p className="text-gray-600">{producto.precio_compra}</p>
        <p className="text-gray-600">{producto.precio_venta}</p>
        <p className="text-gray-600">{producto.cantidad_actual}</p>
        <p className="text-gray-600">{producto.cantidad_minima}</p>
        <p className="text-gray-600">{producto.unidad_medida}</p>
        <p className="text-gray-600">{producto.codigo_barras || "No posee codigo"}</p>
      </div>
    )
}