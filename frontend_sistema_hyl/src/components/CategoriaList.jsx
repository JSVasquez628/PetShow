import {useEffect, useState} from 'react';
import {getAllCategorias} from '../api/product.api';
import {CategoriaCard} from './categoriaCard';

export function CategoriaList() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function loadCategorias() {
            const res = await getAllCategorias();
            setCategorias(res.data);
        }
        loadCategorias();
    }, []);
  return (
    <div>
        {categorias.map(categoria => (
            <CategoriaCard key={categoria.id} categoria={categoria} />
        ))}
    </div>
  )
}

export default CategoriaList