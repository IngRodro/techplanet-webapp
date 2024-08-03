import React, { useCallback, useEffect, useMemo, useState } from "react";
import image1 from "../assets/banner/graficas.jpg";
import image2 from "../assets/banner/ryzen8000.jpg";
import image3 from "../assets/banner/ps5.jpg";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = useMemo(() => [image1, image2, image3], []);

  const nextImage = useCallback(() => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }else {
      setCurrentImage(0);
    }
  },[currentImage, desktopImages]);

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1);
    } else {
      setCurrentImage(2);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
        nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="bg-slate-100 mx-auto max-w-screen-xl flex flex-col md:flex-row gap-6 p-4">
      <div className="flex-grow flex items-center justify-center md:w-1/3">
        <div className="text-center">Message</div>
      </div>
      <div className="w-full md:w-2/3 mx-auto rounded">
        <div className="relative h-56 md:h-96 w-full bg-slate-200">
          <div className="absolute z-10 h-full w-full flex items-center justify-between px-4 md:px-0">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-2 md:p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-2 md:p-1"
            >
              <FaAngleRight />
            </button>
          </div>

          <div className="flex h-full w-full overflow-hidden">
            {desktopImages.map((imageURl, index) => {
              return (
                <div
                  className="w-full h-full min-w-full min-h-full transition-all"
                  key={imageURl}
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  <img src={imageURl} alt="" className="w-full h-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
