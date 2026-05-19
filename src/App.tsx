import { LoginPage } from "@pages/LoginPage";
import { AdvertsPage } from "@pages/AdvertsPage";
import { AdvertPage } from '@pages/AdvertPage';
import { NewAdvertPage } from '@pages/NewAdvertPage';
import { PageNotFound } from "@pages/PageNotFound";

import Layout from "@components/layout";
import { RequireAuth } from '@auth/RequireAuth';

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/adverts" replace />} />
        <Route path="adverts" element={<AdvertsPage />} />
        <Route
          path="adverts/new"
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
        <Route path="adverts/:advertId" element={<AdvertPage />} />
        <Route path="404" element={<PageNotFound />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
