import { useForm } from "react-hook-form";
import { use, useEffect, useState} from "react";
import { createProducto, getAllCategorias, deleteProducto, updateProducto, getProducto } from "../api/product.api";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function ProductoFormPage() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm();  

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await getAllCategorias();
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    }
    fetchCategorias();
  }, []);

  const onSubmit = handleSubmit(async(data)=>{
    // Convertir string vacío a null para codigo_barras
    if (data.codigo_barras === "" || data.codigo_barras === undefined) {
      data.codigo_barras = null;
    }
    data.categoria = Number(data.categoria);
    if (params.id) {
      await updateProducto(params.id, data);
      toast.success("Producto actualizado exitosamente");
    } else {
      await createProducto(data);
      toast.success("Producto creado exitosamente");
    }
    
    navigate("/producto");
  });

  useEffect(() => {
      async function loadProducto() {
        if (params.id){
          console.log("obteniendo datos ")
          const res = await getProducto(params.id);
          setValue('nombre', res.data.nombre);
          setValue('precio_compra', res.data.precio_compra);
          setValue('precio_venta', res.data.precio_venta);
          setValue('cantidad_actual', res.data.cantidad_actual);
          setValue('cantidad_minima', res.data.cantidad_minima);
          setValue('unidad_medida', res.data.unidad_medida);
          setValue('codigo_barras', res.data.codigo_barras || "");
          setValue('categoria', res.data.categoria); // Debe ser el ID de la categoría
        }
    }
    loadProducto();
  }, [params.id, setValue]);

  return (
    <div className="max-w-lg mx-auto mt-8 bg-gray-800 p-8 rounded shadow">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.nombre && <span className="text-red-400 text-sm">Este campo es requerido</span>}

        <input
          type="text"
          placeholder="Precio de compra"
          {...register("precio_compra", { required: true })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.precio_compra && <span className="text-red-400 text-sm">Este campo es requerido</span>}

        <input
          type="text"
          placeholder="Precio de venta"
          {...register("precio_venta", { required: true })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.precio_venta && <span className="text-red-400 text-sm">Este campo es requerido</span>}

        <input
          type="number"
          placeholder="Cantidad actual"
          {...register("cantidad_actual")}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Cantidad mínima"
          {...register("cantidad_minima")}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Unidad de medida"
          {...register("unidad_medida", { required: true })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.unidad_medida && <span className="text-red-400 text-sm">Este campo es requerido</span>}

        <input
          type="number"
          placeholder="Código de barras"
          {...register("codigo_barras")}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          {...register("categoria", { required: true })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        {errors.categoria && <span className="text-red-400 text-sm">La categoría es requerida</span>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Guardar
        </button>
      </form>
      {params.id && (
        <button
          onClick={async (e) => {
            e.preventDefault();
            const acceted = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
            if (acceted) {
              await deleteProducto(params.id);
              toast.success("Producto eliminado exitosamente");
              navigate("/producto");
            }
          }}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
        >
          Borrar
        </button>
      )}
    </div>
  );
}

