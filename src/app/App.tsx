import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import Layout from './layout/layout';
import AdminLayout from './layout/adminLaoyut';
import { SchedulePage } from '../pages/admin/SchedulePage';
import { HomePage } from '../pages/client/HomePage';
import { AdminIncomingPage } from '../pages/admin/IncomingPage';
import { AdminBannerPage } from '../pages/admin/BannerPage';
import { AdminMenuPage, MenuFormPage } from '../pages/admin/MenuPage';
import { AdminPanel } from '../pages/admin/CategoryPage';
import BannerCrud from '../pages/admin/BannerPage/ui/BannerCrud';
import MainMenu from '../widgets/Menu/ui/MainMenu';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  SubCategoriesPage,
  SubCategoryForm,
} from '../pages/admin/SubCategoryPage';

import 'react-toastify/dist/ReactToastify.css';
import BarMenu from '../widgets/Menu/ui/BarMenu';
import { FloorForm, FloorPanel } from '../pages/admin/FloorPage';
import { CommonPage } from '../pages/admin/CommonPage';
import { HelmetProvider } from 'react-helmet-async';
import FloorTable from '../pages/admin/FloorPage/ui/floorTable';

const App = () => {
  const { pathname } = useLocation() as { pathname: string };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const adminRoutes = useRoutes([
    {
      path: '/admin/*',
      element: (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<AdminBannerPage />} />
            <Route path="/incoming" element={<AdminIncomingPage />} />
            <Route path="/menu" element={<AdminMenuPage />} />
            <Route path="/menu-submit" element={<MenuFormPage />} />
            <Route path="/category" element={<AdminPanel />} />
            <Route path="/common" element={<CommonPage />} />
            <Route path="/department" element={<FloorPanel />} />
            <Route path="/department-submit" element={<FloorForm />} />
            <Route path="/department-submit/:id" element={<FloorForm />} />
            <Route path="/department-table/:id" element={<FloorTable />} />
            <Route path="/sub-category" element={<SubCategoriesPage />} />
            <Route path="/sub-category-submit" element={<SubCategoryForm />} />
            <Route
              path="/sub-category-submit/:id"
              element={<SubCategoryForm />}
            />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/banner/:id" element={<BannerCrud />} />
          </Routes>
        </AdminLayout>
      ),
    },
  ]);

  return (
    <HelmetProvider>
      <ToastContainer />
      {pathname.includes('admin') ? (
        adminRoutes
      ) : (
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kitchen" element={<MainMenu />} />
            <Route path="/bar" element={<BarMenu />} />
          </Routes>
          <Footer />
        </Layout>
      )}
    </HelmetProvider>
  );
};

export default App;
