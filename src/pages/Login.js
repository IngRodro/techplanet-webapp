import React, { useContext, useState } from "react";
import SignIcon from "../components/SignIcon";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserCartCount } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault()

        const dataResponse = await fetch(summaryApi.signIn.url,{
            method : summaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            await fetchUserDetails()
            await fetchUserCartCount();
            navigate('/')
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

  }


  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-slate-50 p-5 w-full max-w-sm mx-auto">
          <div className="h-20 w-20 mx-auto">
            <SignIcon color={"#1d4ed8"} />
          </div>
          <form onSubmit={handleSubmit} className="w-full pt-6 flex flex-col gap-6 mx-2">
            <div className="flex items-center w-full justify-center border focus-within:shadow-sm">
              <div className="text-lg min-w-[40px] h-8 bg-blue-700 flex items-center justify-center">
                <MdOutlineMail color="white" />
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                className="w-full outline-none h-8 pl-2"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex items-center w-full justify-center border focus-within:shadow-sm">
              <div className="text-lg min-w-[40px] h-8 bg-blue-700 flex items-center justify-center">
                <MdLockOutline color="white" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleOnChange}
                value={data.password}
                className="w-full outline-none h-8 pl-2"
              />
              <div
                className="min-w-[40px] h-8 flex items-center justify-center bg-white cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto text-blue-700 hover:underline"
            >
              ¿Olvidaste tu Contraseña?
            </Link>
            <button className="bg-blue-700 text-white px-6 py-2 min-w-[250px] shadow-md hover:scale-105 hover:bg-blue-900 transition-all mx-auto block my-6">
              Acceder
            </button>
          </form>
          <div className="flex items-center w-full max-w-md">
            <div className="flex-grow border-t border-blue-600"></div>
            <Link
              to={"/sign-up"}
              className="text-blue-700 hover:underline mx-6"
            >
              Regístrate
            </Link>
            <div className="flex-grow border-t border-blue-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
