import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import Layout from './layout/layout';
import AdminLayout from './layout/adminLaoyut';
import { AdminHomePage } from '../pages/admin/HomePage';
import { HomePage } from '../pages/client/HomePage';
import { AdminIncomingPage } from '../pages/admin/IncomingPage';
import { AdminMenuPage } from '../pages/admin/MenuPage';

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
