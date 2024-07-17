import { FC, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { MenuType } from '../../../features/AdminFilterMenu/model/types/type';

const MenuCard: FC<{ menu: MenuType[] }> = ({ menu }) => {
  const variants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <div className="mt-[30px]">
      <div className="flex flex-wrap gap-[20px] justify-center">
        {menu?.map((item: MenuType) => (
          <Card key={item.id} item={item} variants={variants} />
        ))}
      </div>
    </div>
  );
};

const Card: FC<{ item: MenuType; variants: Variants }> = ({
  item,
  variants,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
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
        src={`https://backend.bono-bar.com${item.image}`}
        alt=""
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
          <h3 className="text-[16px] font-semibold">{item.title}</h3>
          <h3 className="text-[16px] font-semibold text-nowrap">
            {item.price} с
          </h3>
        </div>
        <p className="text-[12px] text-wrap">{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default MenuCard;
