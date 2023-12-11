import { LoginPage } from "@pages/LoginPage";
import { AdvertsPage } from "@pages/AdvertsPage";
import { AdvertPage } from '@pages/AdvertPage';
import { NewAdvertPage } from '@pages/NewAdvertPage';


import Layout from "@components/layout";

import { Route, Routes, Navigate } from "react-router-dom";
import { PageNotFound } from "@pages/PageNotFound";


function App() {
  return (
    <Routes>
    <Route path="/login" element={<LoginPage />} />

    {/* Anida todas las rutas que requieren el Layout dentro de una ruta padre */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/adverts" />} />
      <Route path="adverts" element={<AdvertsPage />} />
      <Route path="adverts/:advertId" element={<AdvertPage />} />
      <Route path="adverts/new" element={<NewAdvertPage />} />
      <Route path="404" element={<PageNotFound />} />
    </Route>

    {/* Ruta para redirigir a la página de anuncios desde la raíz */}
    <Route path="/" element={<Navigate to="/adverts" />} />

    {/* Ruta de captura de todos para manejar URLs no encontradas */}
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
  );
}

export default App;
