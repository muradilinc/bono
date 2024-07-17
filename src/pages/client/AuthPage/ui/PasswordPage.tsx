import { Link } from 'react-router-dom';

export const PasswordPage = () => {
  return (
    <div className="flex gap-x-3 h-svh justify-center items-center px-[10px]">
      <Link
        to="/check-code-crm?type=crm"
        className="w-full text-white py-[16px] px-[24px] border border-white rounded text-center"
      >
        CRM
      </Link>
      <Link
        to="/check-code-crm?type=admin"
        className="w-full text-white py-[16px] px-[24px] border border-white rounded text-center"
      >
        ADMIN
      </Link>
    </div>
  );
};
