import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import summaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logoutUser.url, {
      method: summaryApi.logoutUser.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      context.fetchUserCartCount();
      setMenuDisplay(false)
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-sm border">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <section className="flex items-center">
          <Link to={"/"}>
            <Logo width={120} />
          </Link>
        </section>

        <section className="hidden md:flex items-center w-full justify-between max-w-sm border rounded-r-full focus-within:shadow-sm pl-1">
          <input
            type="text"
            placeholder="Ingrese su búsqueda ..."
            className="w-full outline-none pl-2"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-700 flex items-center justify-center rounded-r-full">
            <GrSearch color="white" />
          </div>
        </section>

        <section className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic?.secure_url}
                className="w-10 h-10 rounded-full"
                alt={user?.name}
                onClick={() => setMenuDisplay(prev => !prev)}
              />
            ) : null}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-1 shadow-lg rounded z-50">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel"}
                      className="whitespace-nowrap block hover:bg-slate-100 p-2 "
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="whitespace-nowrap block w-full text-left hover:bg-slate-100 p-2"
                  >
                    Cerrar Sesión
                  </button>
                </nav>
              </div>
            )}
          </div>
          <div className="text-2xl relative">
            <span>
              <Link to={"/cart"}>
                <FaShoppingCart />
              </Link>
            </span>
            <div className="bg-blue-700 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
              <p className="text-sm">{context?.cartProductCount ?? 0}</p>
            </div>
          </div>

          {!user?.id && (
            <Link
              to={"/login"}
              className="px-3 py-1 bg-blue-700 text-white hover:bg-blue-900"
            >
              Iniciar Sesión
            </Link>
          )}
        </section>
      </div>

      {/* Search input for small screens */}
      <div className="flex items-center gap-7 lg:hidden w-full mt-2">
          <div className="flex-grow border rounded-full focus-within:shadow-sm pl-1 flex items-center">
            <input
              type="text"
              placeholder="Ingrese su búsqueda ..."
              className="w-full outline-none pl-2"
              onChange={handleSearch}
              value={search}
            />
            <div className="text-lg min-w-[50px] h-8 bg-blue-700 flex items-center justify-center rounded-full">
              <GrSearch color="white" />
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;
