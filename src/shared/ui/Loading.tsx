const Loading = () => {
  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-black z-[100] flex-col">
      <div
        className="w-12 h-12 rounded-full border-t-3 border-r-3 border-white"
        style={{
          borderTopColor: '#212121',
          animation: 'rotation 1s linear infinite',
        }}
      ></div>
      <span className="mt-[10px] text-white text-[14px]">Загрузка...</span>
    </div>
  );
};

export default Loading;
