import { BannerCardsProps } from '../types/type';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { PencilSimple } from '@phosphor-icons/react';

const BannerCard = ({ banner }: BannerCardsProps) => {
  return (
    <div className="flex items-center justify-between my-[20px] flex-wrap">
      <div className="flex items-center flex-wrap justify-center md:justify-start">
        <img
          className="w-[120px] h-[68px] rounded-[4px]"
          src={banner.topik_baner[0]?.img}
          alt="no img"
        />
        <div className="flex md:block flex-col text-center md:text-left ml-[10px]">
          <p>Название: {banner.title}</p>
          <p>
            Дата загрузки:{' '}
            {dayjs(banner.topik_baner[0]?.created_at).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>
      <Link to={`/admin/banner/${banner.id}`}>
        {' '}
        <button className="flex items-center bg-[#2B2B2B] px-[16px] py-[12px] rounded-[4px]">
          <PencilSimple size={24} className="mr-[5px]" />
          Редактировать
        </button>
      </Link>
    </div>
  );
};

export default BannerCard;
