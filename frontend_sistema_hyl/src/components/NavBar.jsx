import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-blue-700 p-4">
      <ul className="flex space-x-6 text-white font-semibold">
        <li>
          <Link to="/caja" className="hover:text-yellow-300">Caja</Link>
        </li>
        <li>
          <Link to="/producto" className="hover:text-yellow-300">Producto</Link>
        </li>
        <li>
          <Link to="/categoria" className="hover:text-yellow-300">Categoria</Link>
        </li>
        <li>
          <Link to="/inventario" className="hover:text-yellow-300">Inventario</Link>
        </li>
        <li>
          <Link to="/reportes" className="hover:text-yellow-300">Reportes</Link>
        </li>
      </ul>
    </nav>
  );
}