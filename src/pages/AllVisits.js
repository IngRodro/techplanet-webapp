import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import summaryApi from '../common';  // Aquí importas summaryApi

const VisitsDashboard = () => {
  const [visitsData, setVisitsData] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch(summaryApi.getVisits.url, {
          method: summaryApi.getVisits.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          }
        });

        const data = await response.json();

        if (data.success) {
          // Agrupar las visitas de usuarios registrados y no registrados
          let registeredVisits = 0;
          let unregisteredVisits = 0;

          data.data.forEach((item) => {
            if (item.user === 'unregistered') {
              unregisteredVisits += item.visits;
            } else {
              registeredVisits += item.visits;
            }
          });

          // Formatear los datos para el gráfico
          const formattedData = [
            { user: 'Registrados', visits: registeredVisits },
            { user: 'Invitados', visits: unregisteredVisits }
          ];

          setVisitsData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching visit data:', error);
      }
    };

    fetchVisits();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Dashboard de <span className="text-indigo-600">Visitas</span>
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={visitsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#82ca9d" name="Visitas"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitsDashboard;