import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";
import productCategory from "../helpers/productCategory";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      if (dataResponse.success) {
        const mappedData = dataResponse.data.map((product) => {
          const category = productCategory.find(
            (cat) => cat.value === product.category
          );
          return {
            ...product,
            categoryLabel: category ? category.label : product.category,
          };
        });
        setCategoryProduct(mappedData);
      } else {
        setCategoryProduct([]);
      }
    } catch (error) {
      setCategoryProduct([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto h-48 p-4">
      <div className="flex items-center justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer items-center justify-center flex flex-col max-w-28"
                  key={product?.category}
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                    <img
                      src={product?.productImages[0]?.secure_url}
                      alt={product?.categoryLabel}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.categoryLabel}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
