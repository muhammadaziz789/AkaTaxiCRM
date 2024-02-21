import { useState } from 'react';
import { PassengerIcon, PassengerVehicleIcon, DriverIcon, DriverVehicleIcon } from '../../../../components/IconGenerator/Svg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'August', 'Sentyabr', 'Obtyabr', 'Noyabr', 'Dekabr'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Header = () => {
  const [index, setIndex] = useState<any>(1)

  const nextButton = () => {
    if (MONTHS.length - 1 > index) {
      setIndex((prev: any) => ++prev)
    } else if (MONTHS.length - 1 == index) {
      setIndex(0)
    }
  }

  const prevButton = () => {
    if (index > 0) {
      setIndex((prev: any) => --prev)
    } else if (index == 0) {
      setIndex(11)
    }
  }

  const date = new Date(`${MONTHS_EN[index]} 01, 2025`)
  console.log(date);
  
  
  



  return (
    <div className="flex justify-between h-[60px] items-center px-5">
      <div className='flex items-center gap-[18px]'>
        <p className="text-[var(--error)] font-medium">1 {MONTHS[index]}, 2024 - 31 {MONTHS[index]}, 2024</p>
        <div className='flex items-center gap-2 cursor-pointer'>
          <IoIosArrowBack onClick={prevButton} />
          <IoIosArrowForward onClick={nextButton} />
        </div>
      </div>

      <div className="flex text-[14px] text-[var(--gray)] space-x-[30px] font-medium">
        <p className="flex gap-1 items-center">
          <PassengerVehicleIcon />
          Yo’lovchi marshruti
          {/* <div className="w-[8px] h-[8px] bg-[var(--darkerGreen)] rounded-full ml-1"></div> */}
        </p>
        <p className="flex  gap-1 items-center">
          <DriverIcon />
          Yangi haydo'vchilar
          {/* <div className="w-[8px] h-[8px] bg-[var(--error)] rounded-full ml-1"></div> */}
        </p>
        <p className="flex gap-1 items-center">
          <PassengerIcon />
          Yangi yo'lovchilar
          {/* <div className="w-[8px] h-[8px] bg-[var(--blue)] rounded-full ml-1"></div> */}
        </p>
        <p className="flex gap-1 items-center">
          <DriverVehicleIcon />
          Haydovchi marshruti
          {/* <div className="w-[8px] h-[8px] bg-yellow-500 rounded-full ml-1"></div> */}
        </p>
      </div>
    </div>
  );
};

export default Header;
