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
        <button>Занят</button>
        <button>Забронирован</button>
      </div>
    </div>
  );
};

export default BtnTable;
