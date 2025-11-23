import { useState, useEffect } from "react";
import axios from "axios";
import { FlightSearchForm } from "../components/FlightSearchForm";
import { FlightCard } from "../components/FlightCard";
import { Vuelo } from "../types";

interface FlightSearchPageProps {
  onFlightSelect: (flight: Vuelo) => void;
}

export function FlightSearchPage({ onFlightSelect }: FlightSearchPageProps) {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("filters");
    if (saved) {
      buscarVuelos(JSON.parse(saved));
    } else {
      // sin filtros, traemos todos los vuelos
      cargarTodos();
    }
  }, []);

  async function cargarTodos() {
    try {
      setLoading(true);
      const resp = await axios.get<Vuelo[]>("http://localhost:8080/api/vuelos");
      setVuelos(resp.data);
    } catch (err) {
      console.error("❌ Error cargando todos los vuelos:", err);
    } finally {
      setLoading(false);
    }
  }

  // --- Función principal para consultar vuelos ---
  async function buscarVuelos(filters: any) {
    try {
      setLoading(true);

      let { origen = "", destino = "", fecha = "" } = filters;

      console.log("📌 Filtros recibidos:", filters);

      // Si la fecha viene en formato DD/MM/YYYY desde HomePage
      if (fecha && fecha.includes("/")) {
        const [day, month, year] = fecha.split("/");
        fecha = `${year}-${month}-${day}`; // YYYY-MM-DD
      }

      // si no hay fecha, mejor traemos todos
      if (!origen && !destino && !fecha) {
        await cargarTodos();
        return;
      }

      const response = await axios.get<Vuelo[]>(
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
      setVuelos([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      {/* Buscador interno */}
      <FlightSearchForm onSearch={buscarVuelos} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Vuelos disponibles</h2>

      {loading && <p className="text-gray-600">Cargando vuelos...</p>}

      <div className="flex flex-col gap-4">
        {!loading && vuelos.length === 0 && (
          <p className="text-gray-600">No se encontraron vuelos.</p>
        )}

        {vuelos.map((vuelo) => (
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