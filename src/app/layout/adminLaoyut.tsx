import React, { PropsWithChildren } from 'react';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="container mx-auto flex gap-x-3">{children}</main>;
};

export default AdminLayout;
