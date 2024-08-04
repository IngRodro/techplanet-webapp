import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoryLabel, productCategory } from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import summaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setData(() => {
      if (!dataResponse.data) {
        return [];
      }

      return dataResponse.data.map((product) => {
        return {
          ...product,
          category: getCategoryLabel(product.category),
        };
      });
    });
    setLoading(false);
  }, [filterCategoryList]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory, navigate]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <button
        className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-lg z-50 transition-transform  ${
          menuOpen ? 'left-52' : 'left-0'
        }`}
        onClick={toggleMenu}
      >
        {menuOpen ? '<<' : '>>'}
      </button>
      <div
        className={`fixed top-0 left-0 h-full border-r-blue-700 border-solid border-2 bg-white p-4 transition-transform transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div>
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Ordenar por
          </h3>

          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                checked={sortBy === "asc"}
                onChange={handleOnChangeSortBy}
                value="asc"
              />
              <label>Precio - Bajo a alto</label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                checked={sortBy === "dsc"}
                onChange={handleOnChangeSortBy}
                value="dsc"
              />
              <label>Precio - Alto a Bajo</label>
            </div>
          </form>
        </div>
  
        <div>
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Categoria
          </h3>

          <form className="text-sm flex flex-col gap-2 py-2">
            {productCategory.map((categoryName, index) => {
              return (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName.value]}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>
                    {categoryName.label}
                  </label>
                </div>
              );
            })}
          </form>
        </div>
      </div>

      <div className="px-4 ml-0 lg:ml-64">
        <p className="font-medium text-slate-800 text-lg my-2">
          Search Results: {data.length}
        </p>

        <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
          {data.length !== 0 && !loading && (
            <VerticalCard data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
