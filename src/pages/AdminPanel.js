import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
   <div className="relative min-h-[calc(100vh-100px)] flex">
      {/* Button for toggling sidebar */}
      <button
        onClick={toggleMenu}
        className="fixed top-20 left-4 bg-gray-800 text-white p-2 rounded z-50 md:hidden"
      >
        {menuOpen ? "<<" : ">>"}
      </button>

      {/* Sidebar for larger screens */}
      <aside className="hidden md:block min-h-full w-full max-w-xs shadow-md">
        <div className="h-32 mt-10 flex justify-center items-center flex-col gap-2">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic?.secure_url}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid p-4">
          <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
            Usuarios
          </Link>
          <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
            Productos
          </Link>
        </nav>
      </aside>

      {/* Sidebar for smaller screens */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-md transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-40`}
      >
        <div className="h-32 mt-10 flex justify-center items-center flex-col gap-2">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic?.secure_url}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid p-4">
          <Link
            to={"all-users"}
            className="px-2 py-1 hover:bg-slate-100"
            onClick={toggleMenu}
          >
            Usuarios
          </Link>
          <Link
            to={"all-products"}
            className="px-2 py-1 hover:bg-slate-100"
            onClick={toggleMenu}
          >
            Productos
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="w-full h-full p-2 ml-0 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
