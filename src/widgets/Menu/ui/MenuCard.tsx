import { FC, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { MenuType } from '../../../features/AdminFilterMenu/model/types/type';
import lol from './../../../../public/images/wine.jpg';

interface Props {
  menu: MenuType[];
  type?: string;
}

const MenuCard: FC<Props> = ({ menu, type }) => {
  const variants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <div className="mt-[30px]">
      <div className="flex flex-wrap gap-[20px] justify-center">
        {menu?.map((item: MenuType) => (
          <Card key={item.id} item={item} variants={variants} type={type} />
        ))}
      </div>
    </div>
  );
};

const Card: FC<{ item: MenuType; variants: Variants; type?: string }> = ({
  item,
  variants,
  type,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {type !== 'bar' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0,
          }}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          className="relative max-h-[465px] flex-auto md:flex-100"
        >
          <img
            className="w-full h-full object-cover"
            src={
              type === 'bar'
                ? item.image
                  ? `https://backend.bono-bar.com${item.image}`
                  : lol
                : `https://backend.bono-bar.com${item.image}`
            }
            alt="image"
          />
          <motion.div
            animate={isActive ? 'open' : 'closed'}
            transition={{
              duration: 0.3,
            }}
            variants={variants}
            className="absolute w-full bottom-0 bg-[rgba(23,23,23,0.6)] p-[10px]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[16px]">{item.title}</h3>
              <h3 className="text-[16px] text-nowrap">{item.price} с</h3>
            </div>
            <p className="text-[12px] text-wrap">{item.description}</p>
          </motion.div>
        </motion.div>
      ) : (
        <div
          className={`relative min-h-[465px] flex-auto md:flex-100 ${item.image ? '' : 'bg-black border border-white'}`}
        >
          {item.image ? (
            <img
              className="w-full h-full object-cover"
              src={
                type === 'bar'
                  ? item.image
                    ? `https://backend.bono-bar.com${item.image}`
                    : lol
                  : `https://backend.bono-bar.com${item.image}`
              }
              alt="image"
            />
          ) : null}
          <div className="absolute w-full bottom-0 bg-[rgba(23,23,23,0.6)] p-[10px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px]">{item.title}</h3>
              <h3 className="text-[16px] text-nowrap">{item.price} с</h3>
            </div>
            <p className="text-[12px] text-wrap">{item.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuCard;
