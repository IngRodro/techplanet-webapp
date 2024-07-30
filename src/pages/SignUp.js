import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SignIcon from "../components/SignIcon";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-slate-50 p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div className="h-20 w-20 mx-auto">
              <SignIcon color={"#1d4ed8"} />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-6 mx-2" onSubmit={handleSubmit}>
          <div className="flex items-center w-full justify-center border focus-within:shadow-sm">
              <div className="text-lg min-w-[40px] h-8 bg-blue-700 flex items-center justify-center">
                <HiIdentification color="white" />
              </div>
              <input
                type="text"
                placeholder="Nombre Completo"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                className="w-full outline-none h-8 pl-2"
              />
            </div>

            <div className="flex items-center w-full justify-center border focus-within:shadow-sm">
              <div className="text-lg min-w-[40px] h-8 bg-blue-700 flex items-center justify-center">
                <MdOutlineMail color="white" />
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full outline-none h-8 pl-2"
              />
            </div>

            <div className="flex items-center w-full justify-center border focus-within:shadow-sm">
              <div className="text-lg min-w-[40px] h-8 bg-blue-700 flex items-center justify-center">
                <MdLockOutline color="white" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full outline-none h-8 pl-2"
              />
              <div
                className="min-w-[40px] h-8 flex items-center justify-center bg-white cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>

            <div className="flex items-center w-full justify-center border focus-within:shadow-sm">
              <div className="text-lg min-w-[40px] h-8 bg-blue-700 flex items-center justify-center">
                <MdLockOutline color="white" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="w-full outline-none h-8 pl-2"
              />
              <div
                className="min-w-[40px] h-8 flex items-center justify-center bg-white cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
              </div>
            </div>

            <button className="bg-blue-700 text-white px-6 py-2 min-w-[250px] shadow-md hover:scale-105 hover:bg-blue-900 transition-all mx-auto block my-6">
              Registrarme
            </button>
          </form>

          <div className="flex items-center w-full max-w-md">
            <div class="flex-grow border-t border-blue-600"></div>
              <Link to={'/login'}className="text-blue-700 hover:underline mx-6">Acceder</Link>
            <div class="flex-grow border-t border-blue-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
