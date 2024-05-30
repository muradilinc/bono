import { Link } from 'react-router-dom';
import { links } from '../../../app/constants/links';

export const Sidebar = () => {
  return (
    <aside className="w-full max-w-[200px] flex flex-col gap-[50px]">
      <div className="bg-[#F4FAFF] p-[16px] flex items-center">
        <h6 className="font-semibold text-[17px] opacity-60">Админ. панель</h6>
      </div>
      <div className="p-[16px] flex flex-col gap-[20px]">
        <ul className="flex flex-col gap-[10px]">
          {links.map((link, idx) => (
            <li
              className="p-[10px] hover:bg-[#5780EB] hover:text-white rounded-[8px] duration-300 font-medium opacity-70"
              key={idx}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
