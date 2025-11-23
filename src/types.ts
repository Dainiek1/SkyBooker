export interface FlightFilters {
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number;
}

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  rol: "admin" | "usuario";
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
  escalas: number;
  cuposDisponibles: number;
}
