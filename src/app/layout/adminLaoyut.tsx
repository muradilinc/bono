import React, { PropsWithChildren } from 'react';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation() as { pathname: string };
  return (
    <main className="flex w-full">
      {pathname != '/admin' ? <Sidebar /> : null}
      <div className="w-full">{children}</div>
    </main>
  );
};

export default AdminLayout;
