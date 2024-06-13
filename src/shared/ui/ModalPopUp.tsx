import { useEffect } from 'react';
import { IPopUp } from '../types/Type';

const ModalPopUp = ({ popUp, setPopUp, propText }: IPopUp) => {
  useEffect(() => {
    if (popUp) {
      const timer = setTimeout(() => {
        setPopUp(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popUp, setPopUp]);
  return (
    <>
      {popUp ? (
        <div className="fixed right-0 top-5 mr-5 z-100">
          <div className="bg-[white] rounded-[50px] flex items-center justify-center py-[12px] w-[350px]">
            <span className="bg-[#8CDF7E] w-[25px] h-[25px] rounded-[50%] flex items-center justify-center text-white">
              ✓
            </span>
            <h3 className="font-semibold ml-[5px]">{propText}</h3>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalPopUp;
