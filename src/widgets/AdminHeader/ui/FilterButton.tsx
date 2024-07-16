import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/store/hooks';
import { selectFloors } from '../../../features/floors/model/floorSlice';

interface Props {
  setAddModal: (modal: boolean) => void;
  setModal: (modal: boolean) => void;
  modal: boolean;
  setCurrentFloor: (floor: number) => void;
  setQueryText: (text: string) => void;
}

export const FilterButton: FC<Props> = ({ setCurrentFloor }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const floors = useAppSelector(selectFloors);

  useEffect(() => {
    setCurrentFloor(currentIndex);
  }, [currentIndex, setCurrentFloor]);
  return (
    <div className="h-[47px] w-[850px] px-[12px] flex items-center justify-center gap-[10px] rounded-[8px] bg-black text-white">
      {floors.length > 0 ? (
        <>
          <div className="flex items-center gap-[30px]">
            {floors.map((fl, inx) => (
              <h4
                onClick={() => setCurrentIndex(inx)}
                key={inx}
                className={`text-[20px] cursor-pointer border-white ${currentIndex === inx ? 'border-b-2' : ''}`}
              >
                {fl.title}
              </h4>
            ))}
          </div>
        </>
      ) : (
        <h4>Нету</h4>
      )}
    </div>
  );
};
