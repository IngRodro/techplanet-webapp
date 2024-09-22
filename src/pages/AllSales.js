// src/SalesDashboard.js
import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import summaryApi from "../common";
// Registra los elementos de Chart.js
Chart.register(...registerables);

const SalesDashboard = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weeklySales, setWeeklySales] = useState([]);

  const fetchSalesData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${summaryApi.getSales.url}?month=${month}&year=${year}`,
        {
          method: summaryApi.currentUser.method,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setSalesData(data);
      groupSalesByWeek(data.sales); // Agrupa las ventas por semana
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  const groupSalesByWeek = (sales) => {
    const weeks = Array(5).fill(0); // Asumiendo que hay un máximo de 5 semanas en un mes
    sales.forEach((sale) => {
      const weekIndex = Math.floor(new Date(sale.purchaseDate).getDate() / 7);
      weeks[weekIndex] += sale.totalAmount;
    });
    setWeeklySales(weeks);
  };

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  const data = {
    labels: [`Semana 1`, `Semana 2`, `Semana 3`, `Semana 4`, `Semana 5`],
    datasets: [
      {
        label: "Total Ventas por Semana",
        data: weeklySales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Dashboard de <span className="text-indigo-600">Ventas</span>
      </h2>
      <div className="flex items-center my-4">
        <label className="mr-2">Mes:</label>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {[...Array(12).keys()].map((m) => (
            <option key={m} value={m + 1}>
              {m + 1}
            </option>
          ))}
        </select>
        <label className="ml-4 mr-2">Año:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min="2020"
          className="border rounded p-1"
        />
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {salesData && (
        <div>
          <h2 className="text-xl mt-4">
            Total de Ventas: ${salesData.totalMonthlySales.toFixed(2)}
          </h2>
          <h3 className="mt-2">{salesData.message}</h3>
          <Bar
            data={data}
            options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
          />
          <ul className="space-y-4">
  {salesData.sales.map((sale) => (
    <li
      key={sale.id}
      className="bg-white shadow-md p-4 border border-gray-200 rounded-lg transition-transform transform hover:scale-105"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">
          <strong>Usuario:</strong> {sale.userId.name}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Fecha:</strong> {new Date(sale.purchaseDate).toLocaleString()}
        </p>
      </div>

      <p className="text-xl font-bold text-green-600 mt-2">
        <strong>Total:</strong> ${sale.totalAmount.toFixed(2)}
      </p>

      <p className="mt-4 mb-2 text-gray-700">
        <strong>Productos:</strong>
      </p>
      <ul className="space-y-2">
        {sale.products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center border-t border-gray-200 pt-2"
          >
            <div className="text-gray-800 font-medium w-2/3 text-ellipsis overflow-hidden">
              {product.productId.productName}
            </div>
            <div className="text-gray-600 w-1/3 text-right">
              {product.quantity} x ${product.price.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

        </div>
      )}
    </div>
  );
};

export default SalesDashboard;
