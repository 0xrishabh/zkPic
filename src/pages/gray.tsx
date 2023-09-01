import React, { useRef, useState } from "react";
import { grayScale } from "../utils/grayScale";

export default function Test() {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState<any>({
    firstImage: [],
    secondImage: [],
  });
  const [file, setFile] = useState<any>({
    firstImage: "",
    secondImage: "",
  });

  const runMain = () => {
    grayScale(imageData);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setFile((prevData: any) => ({
      ...prevData,
      [event.target.id]: URL.createObjectURL(file),
    }));
    if (file) {
      const img = new Image();
      img.onload = () => {
        const canvas: any = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixelData = imageData.data;
        const pixelArray: any = [];
        for (let i = 0; i < pixelData.length; i += 4) {
          const pixel = [pixelData[i], pixelData[i + 1], pixelData[i + 2]];
          pixelArray.push(pixel);
        }
        setImageData((prevData: any) => ({
          ...prevData,
          [event.target.id]: pixelArray,
        }));
      };
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="relative flex flex-col gap-y-10 place-items-center">
        <p className="text-2xl font-bold">Verify Gray Sacle</p>
        <div className="flex justify-center items-center gap-x-6">
          <div className="w-[300px]">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-black"
            >
              Upload first image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-4">
              <div className="text-center">
                <div className="mt-4 flex text-sm justify-center leading-6 text-gray-900">
                  <label
                    htmlFor="firstImage"
                    className="relative cursor-pointer rounded-md bg-gray-900 font-semibold px-2 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>
                      {imageData.firstImage.length
                        ? "Uploded Sucessfully"
                        : "Upload a file"}
                    </span>
                    <input
                      id="firstImage"
                      name="firstImage"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          {file.firstImage && (
            <img src={file.firstImage} className="!w-[300px] !h-[200px]" />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
        <div className="flex justify-center items-center gap-x-6">
          <div className="w-[300px]">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-black"
            >
              Upload second image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-4">
              <div className="text-center">
                <div className="mt-4 flex justify-center text-sm leading-6 text-gray-900">
                  <label
                    htmlFor="secondImage"
                    className="relative cursor-pointer rounded-md bg-gray-900 font-semibold px-2 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>
                      {imageData.secondImage.length
                        ? "Uploded Sucessfully"
                        : "Upload a file"}
                    </span>
                    <input
                      id="secondImage"
                      name="secondImage"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          {file.secondImage && (
            <img src={file.secondImage} className="!w-[300px] !h-[200px]" />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
        <button
          onClick={runMain}
          className="border-2 border-black px-4 py-1 rounded-xl"
        >
          Genearate proof
        </button>
      </div>
    </main>
  );
}
