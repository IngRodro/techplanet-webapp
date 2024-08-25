import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/displayCurrency";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import summaryApi from "../common";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const changeAvailability = async () => {
    const dataResponse = await fetch(summaryApi.changeAvailability.url, {
      method: summaryApi.changeAvailability.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: data.id,
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      fetchdata();
    }
  };

  return (
    <div
      className={`bg-slate-100 p-4 rounded transition-opacity duration-300 ${
        data.available ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="w-40 relative">
        <div
          className="absolute top-0 left-0 p-2 bg-red-100 rounded-full hover:bg-red-700 hover:text-white cursor-pointer z-10"
          onClick={changeAvailability}
        >
          {data.available ? <FaEye /> : <FaEyeSlash />}
        </div>

        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImages[0].secure_url}
            alt={data?.name}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">{displayCurrency(data.sellingPrice)}</p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
