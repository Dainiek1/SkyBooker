export interface FlightFilters {
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number;
}
export interface Vuelo {
  id: number;
  aerolinea: string;
  numeroVuelo: string;
  origen: string;
  destino: string;
  fecha: string;
  horaSalida: string;
  horaLlegada: string;
  duracion: string;
  precio: number;
  escalas: number | null;
  cuposDisponibles: number | null;
}
