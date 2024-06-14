import { BannerCardsProps } from '../types/type';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const BannerCard = ({ banner }: BannerCardsProps) => {
  return (
    <div className="flex items-center justify-between my-[20px]">
      <div className="flex items-center">
        <img
          className="w-[120px] h-[68px] rounded-[4px]"
          src={banner.topik_baner[0]?.img}
          alt="no img"
        />
        <div className="ml-[10px]">
          <p>Название: {banner.title}</p>
          <p>
            Дата загрузки:{' '}
            {dayjs(banner.topik_baner[0]?.created_at).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>
      <Link to={`/admin/banner/${banner.id}`}>
        {' '}
        <button className="bg-[#2B2B2B] px-[16px] py-[12px] rounded-[4px]">
          Загрузить фото
        </button>
      </Link>
    </div>
  );
};

export default BannerCard;
