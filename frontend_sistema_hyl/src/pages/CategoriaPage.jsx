
import { Link } from 'react-router-dom';
import { CategoriaList } from '../components/CategoriaList';

export function CategoriaPage() {
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Link to="/categoria-create" className="bg-green-600 text-white px-4 py-2 rounded">Crear Categoría</Link>
      </div>
      <CategoriaList />
    </div>
  );
  
}