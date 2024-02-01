const Header = () => {
  return (
    <div className="flex justify-between h-[60px] items-center px-5">
      <p className="text-[var(--error)] font-medium">1 Febral, 2024 - 31 Febral, 2024</p>

      <div className="flex space-x-[30px] font-medium">
        <p className="flex items-center">
          Yangi mashurtlar
          <div className="w-[8px] h-[8px] bg-[var(--darkerGreen)] rounded-full ml-1"></div>
        </p>
        <p className="flex items-center">

          Yangi haydo'vchilar
          <div className="w-[8px] h-[8px] bg-[var(--error)] rounded-full ml-1"></div>
        </p>
        <p className="flex items-center">
          Yangi yo'lovchilar
          <div className="w-[8px] h-[8px] bg-[var(--blue)] rounded-full ml-1"></div>
        </p>
        <p className="flex items-center">
          Yangi qidiruvlar
          <div className="w-[8px] h-[8px] bg-yellow-500 rounded-full ml-1"></div>
        </p>
      </div>
    </div>
  );
};

export default Header;
