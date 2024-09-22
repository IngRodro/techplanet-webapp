import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory } from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common";
import { toast } from "react-toastify";
import imageTobase64 from "../helpers/imageToBase64";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImages: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => ({
      ...prev,
      productImages: [...prev.productImages, imagePic],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImages = [...data.productImages];
    newProductImages.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImages: newProductImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(summaryApi.uploadProduct.url, {
      method: summaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData();
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Agregar Producto</h2>
          <button
            className="text-2xl hover:text-red-600 transition-colors"
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        <form
          className="space-y-4 overflow-y-auto max-h-[70vh] pr-2"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Nombre de Producto:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Ingrese el nombre del producto"
              value={data.productName}
              onChange={handleOnChange}
              className="mt-1 p-2 border rounded-lg w-full bg-slate-100"
              required
            />
          </div>

          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
              Nombre de Marca:
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Ingresa el nombre de la marca"
              value={data.brandName}
              onChange={handleOnChange}
              className="mt-1 p-2 border rounded-lg w-full bg-slate-100"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoría:
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="mt-1 p-2 border rounded-lg w-full bg-slate-100"
              required
            >
              <option value="">Seleccionar Categoría</option>
              {productCategory.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="productImages" className="block text-sm font-medium text-gray-700">
              Imágenes del Producto:
            </label>
            <label htmlFor="uploadImageInput">
              <div className="mt-2 p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer bg-slate-100">
                <FaCloudUploadAlt className="text-3xl text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Agregar Imágenes</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </label>
            {data.productImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.productImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`product-${index}`}
                      className="w-20 h-20 object-cover bg-slate-100 border rounded-lg cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(image);
                      }}
                    />
                    <button
                      className="absolute top-1 right-1 text-white bg-red-600 rounded-full p-1 hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Precio:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Ingresa un precio"
              value={data.price}
              onChange={handleOnChange}
              className="mt-1 p-2 border rounded-lg w-full bg-slate-100"
              required
            />
          </div>

          <div>
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">
              Precio de Venta:
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="Ingresa un precio de venta"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="mt-1 p-2 border rounded-lg w-full bg-slate-100"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Ingresa una descripción del producto"
              value={data.description}
              onChange={handleOnChange}
              rows={4}
              className="mt-1 p-2 border rounded-lg w-full bg-slate-100 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Agregar Producto
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
