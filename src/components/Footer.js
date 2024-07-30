import React from "react";
import { CgSupport } from "react-icons/cg";
import { FiCreditCard } from "react-icons/fi";
import { RiTruckLine } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer class="bg-neutral-700 text-white py-6">
      <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center md:text-left">
        <div class="flex flex-col items-center md:items-center border-gray-50 md:border-r sm:border-r gap-2 p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full">
            <RiTruckLine className="w-8 h-8 text-blue-700" />
          </div>
          <p className="text-base">Envio a todo el país</p>
          <p className="text-sm text-neutral-400">Entregas rápidas</p>
        </div>
        <div class="flex flex-col items-center md:items-center border-gray-50 md:border-r gap-2 p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full">
            <TfiReload className="w-6 h-6 text-blue-700" />
          </div>
          <p className="text-base">Lo últimos en Productos</p>
          <p className="text-sm text-neutral-400">
            Todas las semanas con nuevos ingresos
          </p>
        </div>
        <div class="flex flex-col items-center md:items-center border-gray-50 md:border-r sm:border-r gap-2 p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full">
            <CgSupport className="w-8 h-8 text-blue-700" />
          </div>
          <p className="text-base">Soporte Tecnico Disponible</p>
          <p className="text-sm text-neutral-400">
            Consultanos al +503 2525-5000
          </p>
        </div>
        <div class="flex flex-col items-center md:items-center gap-2 p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full">
            <FiCreditCard className="w-6 h-6 text-blue-700" />
          </div>
          <p className="text-base">Compras en linea Seguras</p>
          <p className="text-sm text-neutral-400">
            Tenemos Certificados SSL / Transacciones Seguras
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
