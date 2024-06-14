import { Slider } from './Slider';

export const Atmosphere = () => {
  return (
    <section className="bg-[#070606] py-[30px] flex flex-col gap-[50px] h-svh">
      <h3 className="font-room font-medium text-[64px] text-center">
        Атмосфера ресторана
      </h3>
      <Slider />
    </section>
  );
};
