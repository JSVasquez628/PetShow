import { useNavigate } from 'react-router-dom';

export function CategoriaCard({ categoria }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categoria/${categoria.id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer" onClick={handleClick}>
      <p className="text-gray-600">{categoria.nombre}</p>
    </div>
  );
}