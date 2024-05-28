import React, { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../widgets/Sidebar';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation() as { pathname: string };
  return (
    <main className="flex w-full">
      {pathname !== '/admin/schedule' ? <Sidebar /> : null}
      <div className="w-full">{children}</div>
    </main>
  );
};

export default AdminLayout;
