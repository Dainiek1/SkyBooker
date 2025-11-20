import { useState, useEffect } from "react";
import axios from "axios";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { FlightCard } from "../components/FlightCard";

export function FlightSearchPage({ onFlightSelect }: any) {
const initialFilters = {}; // no se usa navegación por router

  const [vuelos, setVuelos] = useState([]);
  
  useEffect(() => {
  const saved = sessionStorage.getItem("filters");
  if (saved) {
    buscarVuelos(JSON.parse(saved));
  }
}, []);

  // --- Función principal para consultar vuelos ---
  async function buscarVuelos(filters: any) {
    try {
      let { origen, destino, fecha } = filters;

      console.log("📌 Filtros recibidos:", filters);

      // Si la fecha viene en formato DD/MM/YYYY desde HomePage
      if (fecha && fecha.includes("/")) {
        const [day, month, year] = fecha.split("/");
        fecha = `${year}-${month}-${day}`;
      }

      const response = await axios.get(
        "http://localhost:8080/api/vuelos/buscar",
        {
          params: {
            origen,
            destino,
            fecha,
          },
        }
      );

      console.log("📌 Resultados recibidos:", response.data);
      setVuelos(response.data);
    } catch (err) {
      console.error("❌ Error al obtener vuelos:", err);
    }
  }



  return (
    <div className="p-8">
      {/* Buscador interno */}
      <FlightSearchForm onSearch={buscarVuelos} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Vuelos disponibles</h2>

      <div className="flex flex-col gap-4">
        {vuelos.length === 0 && (
          <p className="text-gray-600">No se encontraron vuelos.</p>
        )}

        {vuelos.map((vuelo: any) => (
  <FlightCard 
    key={vuelo.id} 
    vuelo={vuelo} 
    onReserve={() => onFlightSelect(vuelo)} 
  />
))}

      </div>
    </div>
  );
}
