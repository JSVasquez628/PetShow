import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ProductoPage} from "./pages/ProductoPage"
import {ProductoFormPage} from "./pages/ProductoFormPage"
import { Navigation } from "./components/Navigation";

function App() {
  return(
  <BrowserRouter>
    < Navigation />
    <Routes>
      <Route path="/" element={<Navigate to="/producto" />} />
      <Route path="/producto" element={<ProductoPage />} />
      <Route path="/producto-create" element={<ProductoFormPage />} />  
      <Route path="/producto/:id" element={<ProductoFormPage />} />
    </Routes>
  </BrowserRouter>  
  );
}

export default App 