import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import Layout from './layout/layout';
import AdminLayout from './layout/adminLaoyut';
import { AdminHomePage } from '../pages/admin/HomePage';
import { HomePage } from '../pages/client/HomePage';
import { AdminIncomingPage } from '../pages/admin/IncomingPage';
import { AdminBannerPage } from '../pages/admin/BannerPage';
import { AdminMenuPage } from '../pages/admin/MenuPage';
import AdminPanel from '../pages/admin/Panel/AdminPanel';

const App = () => {
  const { pathname } = useLocation() as { pathname: string };
  const adminRoutes = useRoutes([
    {
      path: '/admin/*',
      element: (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/incoming" element={<AdminIncomingPage />} />
            <Route path="/menu" element={<AdminMenuPage />} />
            <Route path="/category" element={<AdminPanel />} />
            <Route path="/banner" element={<AdminBannerPage />} />
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
