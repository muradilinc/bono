import { useState } from 'react';
import { AuthForm, ResetPass } from '../../../../widgets/Auth';

export const AuthPage = () => {
  const [change, setChange] = useState(false);
  return (
    <div className="h-svh flex justify-center items-center px-[10px]">
      {change ? (
        <ResetPass setChange={setChange} />
      ) : (
        <AuthForm setChange={setChange} />
      )}
    </div>
  );
};
