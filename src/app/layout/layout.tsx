import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default Layout;
