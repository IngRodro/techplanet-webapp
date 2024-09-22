import React, { useCallback, useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import summaryApi from "../common";
import { useSelector } from "react-redux";

const Home = () => {
  const [visitRegistered, setVisitRegistered] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  console.log(user)
  const registerVisit = useCallback(async () => {
    await fetch(summaryApi.registerVisit.url, {
      method: summaryApi.registerVisit.method,
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        user: user? user.email: 'unregistered',
      }),
    });
  }, [user]);

  useEffect(() => {
    if (!visitRegistered && user !== 'loading') {
      registerVisit();
      setVisitRegistered(true); // Marcar que ya se registró la visita
    }
  }, [registerVisit, visitRegistered, user]);


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
        heading={"Ofertas en Tarjetas Gráficas NVIDIA"}
      />
    </>
  );
};

export default Home;
