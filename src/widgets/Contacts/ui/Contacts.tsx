import { Link } from 'react-router-dom';

export const Contacts = () => {
  return (
    <div
      id="contacts"
      className="bg-black w-[90%] m-auto py-[30px] text-white flex items-center xl:justify-between flex-wrap justify-start md:justify-center gap-[30px]"
    >
      <div className="flex flex-col gap-[30px]">
        <div>
          <h1 className="xl:text-[36px] lg:text-[32px] md:text-[28px] text-[24px] font-semibold">
            КОНТАКТЫ
          </h1>
          <p className="text-[#C1C1C1]">Как нас найти и связаться с нами</p>
        </div>
        <div>
          <h1 className="md:text-[20px] text-[17px] font-medium">АДРЕС:</h1>
          <h4 className="mt-[5px] md:text-[16px] text-[15px]">
            улица Сухэ-Батора,17
          </h4>
          <p className="text-[#C1C1C1] md:text-[16px] text-[15px]">
            6-й мк-р, Бишкек
          </p>
        </div>
        <div>
          <h1 className="md:text-[20px] text-[17px] font-medium">ГРАФИК:</h1>
          <h4 className="mt-[5px] md:text-[16px] text-[15px]">
            С 10:00 до 04:00
          </h4>
          <p className="text-[#C1C1C1] md:text-[16px] text-[15px]">
            каждый день без выходных
          </p>
        </div>
        <div>
          <h1 className="md:text-[20px] text-[17px] font-medium">
            НОМЕР ТЕЛЕФОНА:
          </h1>
          <Link
            to="tel: +996505046256"
            className="mt-[5px] md:text-[16px] text-[15px]"
          >
            +996 505 04 62 56
          </Link>
        </div>
        <div>
          <h1 className="md:text-[20px] text-[17px] font-medium">EMAIL:</h1>
          <Link
            to="mailto:bono.bar.bishkek@gmail.com"
            className="mt-[5px] md:text-[16px] text-[15px]"
          >
            bono.bar.bishkek@gmail.com
          </Link>
        </div>
      </div>
      <div>
        <iframe
          className="max-sm:w-[400px] max-sm:h-[350px] max-[420px]:w-[300px] max-[420px]:h-[280px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1329.2177074488886!2d74.62827608938792!3d42.82873124691491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb78b27e67f87%3A0x670d060864088645!2sBono!5e0!3m2!1sru!2skg!4v1717159422808!5m2!1sru!2skg"
          width="600"
          height="550"
          style={{ border: '0', filter: 'invert(0.9)' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
