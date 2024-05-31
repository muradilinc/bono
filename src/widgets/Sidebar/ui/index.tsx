import { Link } from 'react-router-dom';
import { links } from '../../../app/constants/links';

export const Sidebar = () => {
  return (
    <aside className="w-full max-w-[200px] flex flex-col gap-[50px] bg-[#2B2B2B]">
      <div className="bg-[#2B2B2B] p-[16px] flex items-center">
        <h6 className="font-semibold text-[17px] text-white">Админ. панель</h6>
      </div>
      <div className="p-[16px] flex flex-col gap-[20px]">
        <ul className="flex flex-col gap-[10px]">
          {links.map((link, idx) => (
            <li
              className="p-[10px] hover:bg-[#3D3D3D] hover:opacity-100 rounded-[8px] duration-300 font-medium opacity-90 text-white"
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
