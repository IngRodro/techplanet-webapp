import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import summaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserCartCount = async()=>{
    const dataResponse = await fetch(summaryApi.getCartProductCount.url,{
      method : summaryApi.getCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    fetchUserCartCount();
    fetchUserDetails();
  });

  return (
     <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart: fetchUserCartCount
        }}
      >
        <ToastContainer position='top-center' />
        <Header />
        <main className="min-h-[calc(100vh-100px)] relative">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
