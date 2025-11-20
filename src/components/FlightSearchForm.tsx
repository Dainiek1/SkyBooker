import { useState } from "react";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function FlightSearchForm({ onSearch }: any) {

  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [pasajeros, setPasajeros] = useState(1);

  function handleSubmit(e: any) {
    e.preventDefault();

    const fechaParts = fecha.split("-");
    const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`; // dd/mm/yyyy

    onSearch({
      origen,
      destino,
      fecha: fechaFormateada,
      pasajeros
    });
  }
console.log("🔥 Enviando filtros:", { origen, destino, fecha, pasajeros });


  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div>
          <label className="text-gray-700">Origen</label>
          <Input value={origen} onChange={(e) => setOrigen(e.target.value)} placeholder="Bogotá" />
        </div>

        <div>
          <label className="text-gray-700">Destino</label>
          <Input value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Medellín" />
        </div>

        <div>
          <label className="text-gray-700">Fecha</label>
          <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div>
          <label className="text-gray-700">Pasajeros</label>
          <Input type="number" value={pasajeros} min={1} max={10}
            onChange={(e) => setPasajeros(Number(e.target.value))}

          />
        </div>

      </div>

      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white py-6">
        <Search className="w-5 h-5 mr-2" /> Buscar Vuelos
      </Button>

    </form>
  );
}
