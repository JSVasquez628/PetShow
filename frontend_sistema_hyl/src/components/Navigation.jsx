import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <div>
     <Link to="producto">Prodcto</Link>
     <Link to="/producto-create">Crear Producto</Link>
    </div>
  )
}

export default Navigation