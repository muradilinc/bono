import React, { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation() as { pathname: string };
  return (
    <div className="flex w-full min-h-svh">
      <main className={pathname === '/schedule' ? '' : 'w-full'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
