const Contacts = () => {
  return (
    <div className="bg-black px-[10px] py-[30px] text-white flex items-center xl:justify-between flex-wrap justify-start md:justify-center gap-[30px]">
      <div className="flex flex-col gap-[30px]">
        <div>
          <h1 className="xl:text-[36px] lg:text-[32px] md:text-[28px] text-[32px] font-semibold">
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
            С 10:00 до 02:00
          </h4>
          <p className="text-[#C1C1C1] md:text-[16px] text-[15px]">
            каждый день без выходных
          </p>
        </div>
        <div>
          <h1 className="md:text-[20px] text-[17px] font-medium">
            НОМЕР ТЕЛЕФОНА:
          </h1>
          <h4 className="mt-[5px] md:text-[16px] text-[15px]">
            +996 505 04 62 56
          </h4>
        </div>
        <div>
          <h1 className="md:text-[20px] text-[17px] font-medium">EMAIL:</h1>
          <h4 className="mt-[5px] md:text-[16px] text-[15px]">
            bono.bar.bishkek@gmail.com
          </h4>
        </div>
      </div>
      <div>
        <iframe
          className="max-sm:w-[400px] max-sm:h-[350px] max-[420px]:w-[300px] max-[420px]:h-[280px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4667.866854534391!2d74.62037680157663!3d42.82440658813932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb5d88bcf6177%3A0xa89359d038c6243!2zNi3QuSDQvNC40LrRgNC-0YDQsNC50L7QvSwg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1717153363711!5m2!1sru!2skg"
          width="600"
          height="550"
          style={{ border: '0' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contacts;
