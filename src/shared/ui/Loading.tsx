import '../style/style.css';
const Loading = () => {
  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-black z-[100] flex-col">
      <div className="loader"></div>
      <span className="mt-[10px] text-white text-[14px]">Загрузка...</span>
    </div>
  );
};

export default Loading;
