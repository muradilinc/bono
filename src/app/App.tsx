import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import Layout from './layout/layout';
import AdminLayout from './layout/adminLaoyut';
import { SchedulePage } from '../pages/admin/SchedulePage';
import { HomePage } from '../pages/client/HomePage';
import { AdminIncomingPage } from '../pages/admin/IncomingPage';
import { AdminBannerPage } from '../pages/admin/BannerPage';
import { AdminMenuPage, MenuFormPage } from '../pages/admin/MenuPage';
import { AdminPanel } from '../pages/admin/CategoryPage';

const App = () => {
  const { pathname } = useLocation() as { pathname: string };
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
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </AdminLayout>
      ),
    },
  ]);

  return (
    <>
      {pathname.includes('admin') ? (
        adminRoutes
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
