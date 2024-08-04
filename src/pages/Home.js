import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct
        category={"processors"}
        heading={"Ofertas en Procesadores"}
      />

      <VerticalCardProduct
        category={"graphics_cards"}
        brand={"NVIDIA"}
        heading={"Ofertas en Tarjetas Graficas NVIDIA"}
      />
    </>
  );
};

export default Home;
