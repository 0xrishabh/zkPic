import React, { useRef, useState } from "react";
import { Resize } from "../utils/resize";

export default function Test() {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState<any>({
    orig_image: [],
    new_image: [],
    orig_length: 0,
    orig_width: 0,
    new_length: 0,
    new_width: 0,
  });
  const [file, setFile] = useState<any>({
    orig_image: "",
    new_image: "",
  });

  const runMain = () => {
    Resize(imageData);
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
        const pixelArray: any = new Array(4000);
        let index = 0;
        for (let i = 0; i < pixelData.length; i += 4) {
          // console.log(pixelData[i], pixelData[i + 1], pixelData[i + 2])
          const pixel = pixelData[i];
          pixelArray[index++] = pixel;
        }
        // Fill the array with Empyt value to make the length fullfilment
        for (index; index < pixelArray.length; index++) {
          pixelArray[index] = 0;
        }
        setImageData((prevData: any) => ({
          ...prevData,
          [event.target.id]: pixelArray,
          orig_length: img.height * img.width,
          orig_width: img.width,
        }));
      };
      img.src = URL.createObjectURL(file);
    }
  };
  const handleNewImageUpload = (event: any) => {
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
        const pixelArray: any = new Array(4000);
        let index = 0;
        for (let i = 0; i < pixelData.length; i += 4) {
          const pixel = pixelData[i];
          pixelArray[index++] = pixel;
        }
        for (index; index < pixelArray.length; index++) {
          pixelArray[index] = 0;
        }
        setImageData((prevData: any) => ({
          ...prevData,
          [event.target.id]: pixelArray,
          new_length: img.height * img.width,
          new_width: img.width,
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
        <p className="text-2xl font-bold">Verify Resize</p>
        <div className="flex justify-center items-center gap-x-6">
          <div className="w-[300px]">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-black"
            >
              Upload Original Image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-4">
              <div className="text-center">
                <div className="mt-4 flex text-sm justify-center leading-6 text-gray-900">
                  <label
                    htmlFor="orig_image"
                    className="relative cursor-pointer rounded-md bg-gray-900 font-semibold px-2 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>
                      {imageData.orig_image.length
                        ? "Uploded Sucessfully"
                        : "Upload a file"}
                    </span>
                    <input
                      id="orig_image"
                      name="orig_image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {file.orig_image && (
            <img src={file.orig_image} className="!w-[300px] !h-[200px]" />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
        <div className="flex justify-center items-center gap-x-6">
          <div className="w-[300px]">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-black"
            >
              Upload New image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-4">
              <div className="text-center">
                <div className="mt-4 flex justify-center text-sm leading-6 text-gray-900">
                  <label
                    htmlFor="new_image"
                    className="relative cursor-pointer rounded-md bg-gray-900 font-semibold px-2 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                  >
                    <span>
                      {imageData.new_image.length
                        ? "Uploded Sucessfully"
                        : "Upload a file"}
                    </span>
                    <input
                      id="new_image"
                      name="new_image"
                      type="file"
                      className="sr-only"
                      onChange={handleNewImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {file.new_image && (
            <img src={file.new_image} className="!w-[300px] !h-[200px]" />
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
