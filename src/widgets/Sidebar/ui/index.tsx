import { Link, useParams } from 'react-router-dom';
import { links } from '../../../app/constants/links';

export const Sidebar = () => {
  const params = useParams();

  return (
    <aside className="w-full max-w-[210px] flex flex-col gap-[50px] bg-[#2B2B2B]">
      <div className="bg-[#2B2B2B] p-[16px] flex items-center">
        <h6 className="font-semibold text-[17px] text-white">Админ. панель</h6>
      </div>
      <div className="p-[16px] flex flex-col gap-[20px]">
        <ul className="flex flex-col gap-[10px]">
          {links.map((link, idx) => (
            <Link to={link.path} key={idx}>
              <li
                className={`${Object.values(params)[0] === link.path.split('/')[2] ? 'border-b-2 border-white' : ''} p-[10px] hover:bg-[#3D3D3D] hover:opacity-100 rounded-[8px] duration-300 font-medium opacity-90 text-white`}
              >
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};
