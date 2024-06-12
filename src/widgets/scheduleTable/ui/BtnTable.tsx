const BtnTable = () => {
  return (
    <div className="text-white px-[20px] py-[20px]">
      <div className="flex items-center gap-[30px] h-[50px]">
        <button className="hover:border-b-2 border-white">Все</button>
        <button className="hover:border-b-2 border-white">Занят</button>
        <button className="hover:border-b-2 border-white">Свободен</button>
        <button className="hover:border-b-2 border-white">Забронирован</button>
      </div>
      <div className="flex items-center gap-[30px] h-[50px]">
        <div className="flex items-center gap-x-[5px]">
          <div className="bg-orange-700 w-[12px] h-[12px] rounded-[50px]" />
          <button>Занят</button>
        </div>
        <div className="flex gap-x-[5px] items-center">
          <div className="bg-green-700 w-[12px] h-[12px] rounded-[50px]" />
          <button>Забронирован</button>
        </div>
      </div>
    </div>
  );
};

export default BtnTable;
