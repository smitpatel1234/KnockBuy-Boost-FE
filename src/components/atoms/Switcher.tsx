import React, { useState } from "react";
const valueToNumber = (number: number) => {
  if (number == 1) {
    return true;
  } else {
    return false;
  }
};
const Switcher = (
  { label }: { label: string },
  { isChecked }: { isChecked: number },
  { setIsChecked }: any
) => {
  const handleCheckboxChange = () => {
    if (isChecked === 1) {
      setIsChecked(0);
    } else {
      setIsChecked(1);
    }
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={valueToNumber(isChecked)}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-primary" : "bg-dark"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher;
