import { Plane, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface FlightCardProps {
  vuelo: any;              // <-- Recibe el objeto vuelo del backend
  onReserve?: () => void;
}

export function FlightCard({ vuelo, onReserve }: FlightCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Airline Info */}
        <div className="flex items-center gap-4 min-w-[150px]">
          <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <p className="text-gray-800">{vuelo.aerolinea}</p>
            <p className="text-gray-500">{vuelo.numeroVuelo}</p>
          </div>
        </div>

        {/* Flight Times */}
        <div className="flex-1 flex items-center gap-4">
          <div className="text-center">
            <p className="text-gray-800">{vuelo.horaSalida}</p>
            <p className="text-gray-500">{vuelo.origen}</p>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Clock className="w-4 h-4" />
              <span>{vuelo.duracion}</span>
            </div>

            <div className="w-full h-[2px] bg-gray-300 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Plane className="w-4 h-4 text-sky-600 rotate-90" />
              </div>
            </div>

            {vuelo.escalas === 0 || vuelo.escalas === null ? (
              <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                Directo
              </Badge>
            ) : (
              <Badge variant="secondary" className="mt-1">
                {vuelo.escalas} escala{vuelo.escalas > 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          <div className="text-center">
            <p className="text-gray-800">{vuelo.horaLlegada}</p>
            <p className="text-gray-500">{vuelo.destino}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col items-end gap-3 min-w-[150px]">
          <div className="text-right">
            <p className="text-gray-500">Desde</p>
            <p className="text-sky-600">${vuelo.precio.toLocaleString("es-CO")}</p>
          </div>

          <Button
            onClick={onReserve}
            className="bg-sky-600 hover:bg-sky-700 text-white w-full"
          >
            Reservar
          </Button>
        </div>
      </div>
    </Card>
  );
}
