import React, { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../widgets/Sidebar';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation() as { pathname: string };
  return (
    <main className="flex w-full min-h-svh">
      {pathname !== '/admin/schedule' ? <Sidebar /> : null}
      <div className={pathname !== '/admin/schedule' ? 'w-full' : ''}>
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
