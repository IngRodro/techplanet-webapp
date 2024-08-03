import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"processors"} heading={"Top's Airpodes"}/>

      <VerticalCardProduct category={"graphics_cards"} heading={"graphics_cards"}/>
    </>
  )
}

export default Home