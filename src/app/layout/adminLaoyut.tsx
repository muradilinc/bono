import React, { PropsWithChildren } from 'react';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="">{children}</main>;
};

export default AdminLayout;
