import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export function HomePage() {
  const navigate = useNavigate();

  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [pasajeros, setPasajeros] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("Enviando filtros:", { origen, destino, fecha, pasajeros });

    // 👉 Navega a la página de búsqueda con filtros incluidos
    navigate("/consultar-vuelos", {
      state: {
        origen,
        destino,
        fecha,
        pasajeros,
      },
    });
  };

  return (
    <div className="w-full bg-cover bg-center">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-4">
          Encuentra tu Vuelo Ideal
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
          {/* ORIGEN */}
          <div className="mb-4">
            <label className="text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600" /> Origen
            </label>
            <Input
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Ciudad de origen"
            />
          </div>

          {/* DESTINO */}
          <div className="mb-4">
            <label className="text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600" /> Destino
            </label>
            <Input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ciudad de destino"
            />
          </div>

          {/* FECHA */}
          <div className="mb-4">
            <label className="text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" /> Fecha
            </label>
            <Input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          {/* PASAJEROS */}
          <div className="mb-6">
            <label className="text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" /> Pasajeros
            </label>
            <Input
              type="number"
              min={1}
              max={10}
              value={pasajeros}
              onChange={(e) => setPasajeros(Number(e.target.value))}
            />
          </div>

          {/* BOTON */}
          <Button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-6 text-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar Vuelos
          </Button>
        </form>
      </div>
    </div>
  );
}
