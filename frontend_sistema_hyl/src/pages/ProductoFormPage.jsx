import { useForm } from "react-hook-form";
import { use, useEffect, useState} from "react";
import { createProducto, getAllCategorias, deleteProducto, updateProducto, getProducto } from "../api/product.api";
import { useNavigate,useParams } from "react-router-dom";

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
    if (params.id) {
      updateProducto()
    }else{
      await createProducto(data);
    }
    
    navigate("/producto");
  });

  useEffect(() => {
      async function loadProducto() {
        if (params.id){
          console.log("obteniendo datos ")
          const res = await getProducto(params.id);
          setValue('nombre', res.data.nombre)
          setValue('precio_compra', res.data.precio_compra)
          setValue('precio_venta', res.data.precio_venta)
          setValue('cantidad_actual', res.data.cantidad_actual)
          setValue('cantidad_minima', res.data.cantidad_minima)
          setValue('')
          
        }
    }
    loadProducto();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Nombre"
        {...register("nombre", {required: true})}
        />
        {errors.nombre && <span>Este campo es requerido</span>}
        <input type="text" placeholder="Precio de compra"
        {...register("precio_compra", {required: true})}
        />
        {errors.precio_compra && <span>Este campo es requerido</span>}
        <input type="text" placeholder="Precio de venta"
        {...register("precio_venta", {required: true})}
        />
        {errors.precio_venta && <span>Este campo es requerido</span>}
        <input type="number" placeholder="Cantdad actual"
        {...register("cantidad_actual", {required: false})}
        />
        <input type="number" placeholder="Cantidad minima"
        {...register("cantidad_minima", {required: false})}
        />
        <input type="text" placeholder="Unidad de medida"
        {...register("unidad_medida", {required: true})}
        />
        {errors.unidad_medida && <span>Este campo es requerido</span>}
        <input type="number" placeholder="Codigo"
        {...register("codigo_barras", {required: false})}
        
        />
        <select {...register("categoria", { required: true })}>
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        {errors.categoria && <span>La categoría es requerida</span>}
        <button>Guardar</button>
      </form>
      {
        params.id && (
          <button 
            onClick={async (e) => {
              e.preventDefault();
              console.log("ID a eliminar:", params.id);
              const acceted = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
              if (acceted) {
                await deleteProducto(params.id);
                // Opcional: mostrar mensaje de éxito
                navigate("/producto");
              }
            }}
          >
            Borrar
          </button>
        )
      }
    </div>
  );
}

