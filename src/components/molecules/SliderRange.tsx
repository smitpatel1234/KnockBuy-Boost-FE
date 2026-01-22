"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export const title = "Price Range Slider";


const SliderRange = ({ min = 0, max = 10000, onChange }: { min?: number, max?: number, onChange: (e: number[]) => void }) => {
  const [value, setValue] = useState([min, max]);

  const updateValue = (e: number[]) => {
    setValue(e);
    onChange(e);
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-2">

      <Slider
        id="slider"
        min={min}
        max={max}
        onValueChange={updateValue}
        value={value}
      />
      <div className="flex items-center justify-between text-muted-foreground text-sm">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    </div>
  );
};

export default SliderRange;
