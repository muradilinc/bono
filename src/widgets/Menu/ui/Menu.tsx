import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectCategories } from '../../../features/category/categorySlice';
import { useEffect } from 'react';
import { getCategories } from '../../../features/category/categoryThunk';

export const Menu = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="w-[90%] m-auto py-[30px] bg-black text-white">
      <h1 className="xl:text-[36px] lg:text-[32px] md:text-[28px] text-[24px]">
        Меню
      </h1>
      <p className="text-[#C1C1C1] md:text-[15px] text-[14px]">
        Наслаждайтесь гармонией вкусов в каждом блюде
      </p>
      <div className="flex mt-[30px] flex-wrap gap-[30px] min-[1358px]:justify-between justify-center">
        {categories
          .map((item) => (
            <Link
              to={item.name === 'Кухня' ? '/kitchen' : '/bar'}
              key={item.id}
              className="relative flex-auto md:flex-1 h-[435px] max-h-[435px]"
            >
              <div className="relative flex-auto h-[596px] max-h-[434px]">
                <img
                  className="rounded-[4px] w-full h-full object-cover"
                  src={'https://backend.bono-bar.com' + item.image}
                  alt="no img"
                />
                <h6 className="absolute left-0 bottom-0 right-0 bg-[rgba(23,23,23,0.6)] pl-[30px] py-[10px] sm:text-[20px] text-[16px]">
                  {item.name}
                </h6>
              </div>
            </Link>
          ))
          .slice(0, 2)}
      </div>
    </div>
  );
};
