import { useNavigate } from "react-router-dom"

export function ProductoCard({producto}) {

  const navigate = useNavigate() // Hook para navegar a otras rutas
    return (
        <div
          onClick={() => {
            navigate(`/producto/${producto.id}`) // Redirige a la página de detalle del producto 
          }}
        >
        <h1>{producto.nombre}</h1>
        <p>{producto.precio_compra}</p>
        <p>{producto.precio_venta}</p>
        <p>{producto.cantidad_actual}</p>
        <p>{producto.cantidad_minima}</p>
        <p>{producto.unidad_medida}</p>
        <p>{producto.codigo_barras}</p>
        <p>{producto.categoria}</p>
        <hr />
      </div>
    )
}