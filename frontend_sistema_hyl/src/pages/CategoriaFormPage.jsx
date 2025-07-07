import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  getAllCategorias,
  createCategoria,
  updateCategoria,
  getCategoria,
} from "../api/product.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function CategoriaFormPage() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateCategoria(params.id, data);
      toast.success("Categoría actualizada exitosamente");
    } else {
      await createCategoria(data);
      toast.success("Categoría creada exitosamente");
    }
    navigate("/categoria");
  });
  useEffect(() => {
    async function loadCategoria() {
      if (params.id) {
        const res = await getCategoria(params.id);
        setValue("nombre", res.data.nombre);
      }
    }
    loadCategoria();
  }, [params.id, setValue]);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {params.id ? "Editar Categoría" : "Crear Categoría"}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
            className={`mt-1 block w-full border ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs mt-1">
              {errors.nombre.message}
            </p>
          )}
        </div>
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