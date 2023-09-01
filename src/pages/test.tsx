import React, { useEffect, useState } from "react";
import { mainFunc } from '../ts';

type InputType = {
  firstInput: number;
  secondInput: number;
};

export default function Test() {
  const [inputData, setInputData] = useState<InputType>({
    firstInput: 0,
    secondInput: 0,
  });

  const runMain = () => {
    mainFunc(inputData);
  }

  const handleChange = (id: string, value: string) => {
    setInputData((prevData: InputType) => ({ ...prevData, [id]: Number(value) }));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="relative flex flex-col gap-y-10 place-items-center">
        <div className="w-[300px]">
          <label
            htmlFor="text"
            className="block text-sm font-medium leading-6 text-white"
          >
            Enter first input
          </label>
          <div className="mt-2">
            <input
              id="firstInput"
              name="firstInput"
              type="text"
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="w-[300px]">
          <label
            htmlFor="text"
            className="block text-sm font-medium leading-6 text-white"
          >
            Enter second input
          </label>
          <div className="mt-2">
            <input
              id="secondInput"
              name="secondInput"
              type="text"
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button onClick={runMain} className="border-2 border-white px-4 py-1 rounded-xl">Genearate proof</button>
      </div>
    </main>
  );
}
