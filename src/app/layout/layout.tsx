import React, { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation() as { pathname: string };
  return (
    <>
      <main className={pathname !== '/admin/schedule' ? 'w-full' : ''}>
        {children}
      </main>
    </>
  );
};

export default Layout;
