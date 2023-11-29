import Slider from "@mui/material/Slider";
import { useState } from "react";
import "./style.scss";

const CSlider = () => {
  const minDistance = 5;
  const [value1, setValue1] = useState<number[]>([1975, 2023]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    console.log("event", event);

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <div>
      <div className="px-1">
        <Slider
          getAriaLabel={() => "Minimum distance shift"}
          value={value1}
          onChange={handleChange1}
          //   valueLabelDisplay="auto"
          //   getAriaValueText={valuetext}
          disableSwap
          max={2023}
          min={1975}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="border border-[#E2E2EA] bg-[#fafafb] rounded-[8px] p-2 py-1 w-full">
          {value1[0]}-yil
        </div>
        <div className="mx-1">-</div>
        <div className="border border-[#E2E2EA] bg-[#fafafb] rounded-[8px] p-2 py-1 w-full">
          {value1[1]}-yil
        </div>
      </div>
    </div>
  );
};

export default CSlider;
