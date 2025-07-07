import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ProductoPage} from "./pages/ProductoPage"
import {ProductoFormPage} from "./pages/ProductoFormPage"
import {CategoriaPage} from "./pages/CategoriaPage";
import {CategoriaFormPage} from "./pages/CategoriaFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from 'react-hot-toast';
import { NavBar } from "./components/NavBar";

function App() {
  return(
  <BrowserRouter>
    <div className='container mx-auto px-4'>
      < NavBar />
    < Navigation />
    <Routes>
      <Route path="/" element={<Navigate to="/producto" />} />
      <Route path="/producto" element={<ProductoPage />} />
      <Route path="/producto-create" element={<ProductoFormPage />} />  
      <Route path="/producto/:id" element={<ProductoFormPage />} />
      <Route path="/categoria" element={<CategoriaPage />} />
      <Route path="/categoria-create" element={<CategoriaFormPage />} />
      <Route path="/categoria/:id" element={<CategoriaFormPage />} />
    </Routes>
    <Toaster />
    </div>
  </BrowserRouter>  
  );
}

export default App