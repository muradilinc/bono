import React, { useState } from 'react';
import { AuthForm, ResetPass } from '../../../../widgets/Auth';

interface Props {
  crm: boolean;
}

export const AuthPage: React.FC<Props> = ({ crm }) => {
  const [change, setChange] = useState(false);
  return (
    <div className="h-svh flex justify-center items-center px-[10px]">
      {change ? (
        <ResetPass setChange={setChange} />
      ) : (
        <AuthForm crm={crm} setChange={setChange} />
      )}
    </div>
  );
};
