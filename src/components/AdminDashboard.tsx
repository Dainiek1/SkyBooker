// src/components/AdminDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Plane,
  Users,
  Calendar,
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Search,
  BarChart3,
  Settings,
  Home,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

type Section = "overview" | "flights" | "users" | "bookings" | "payments";

interface Vuelo {
  id: number;
  aerolinea: string;
  numeroVuelo: string;
  origen: string;
  destino: string;
  fecha: string;
  horaSalida: string;
  horaLlegada: string;
  precio: number;
  escalas: number;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

interface Pasajero {
  id: number;
  nombre: string;
  documento: string;
  email: string;
}

interface Reserva {
  id: number;
  vuelo: Vuelo;
  pasajero: Pasajero;
  usuario: Usuario | null;
  fechaReserva: string;
  estado: string;
}

export function AdminDashboard({ onNavigateHome }: AdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState<Section>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [flights, setFlights] = useState<Vuelo[]>([]);
  const [users, setUsers] = useState<Usuario[]>([]);
  const [bookings, setBookings] = useState<Reserva[]>([]);
  const [formData, setFormData] = useState<any>({});

  // ===================== FUNCIÓN PARA FORMATEAR FECHAS =====================
  const formatDate = (value: string): string => {
    // Si ya viene en formato YYYY-MM-DD → retorna igual
    if (value.includes("-")) return value;

    // Convierte YYYYMMDD → YYYY-MM-DD
    if (/^\d{8}$/.test(value)) {
      return value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    }

    return value;
  };

  // ===================== FUNCIÓN PARA FORMATEAR HORAS =====================
  const formatHour = (value: string): string => {
    // Acepta 0400 → 04:00:00
    if (/^\d{4}$/.test(value)) {
      return `${value.substring(0, 2)}:${value.substring(2, 4)}:00`;
    }

    // Acepta 04:00 → 04:00:00
    if (/^\d{2}:\d{2}$/.test(value)) {
      return `${value}:00`;
    }

    return value;
  };

  // ===================== CARGA INICIAL =====================

  useEffect(() => {
    (async () => {
      try {
        const [vRes, rRes, uRes] = await Promise.all([
          axios.get<Vuelo[]>("http://localhost:8080/api/vuelos"),
          axios.get<Reserva[]>("http://localhost:8080/api/reservas"),
          axios.get<Usuario[]>("http://localhost:8080/api/usuarios"),
        ]);

        setFlights(vRes.data);
        setBookings(rRes.data);
        setUsers(uRes.data);
      } catch (err) {
        console.error("❌ Error cargando datos del admin:", err);
      }
    })();
  }, []);

  // ===================== HANDLERS =====================

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedItem(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setDialogMode("edit");
    setSelectedItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este elemento?")) return;

    try {
      if (currentSection === "flights") {
        await axios.delete(`http://localhost:8080/api/vuelos/${id}`);
        setFlights((prev) => prev.filter((f) => f.id !== id));
      }
      if (currentSection === "users") {
        await axios.delete(`http://localhost:8080/api/usuarios/${id}`);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
      if (currentSection === "bookings") {
        await axios.delete(`http://localhost:8080/api/reservas/${id}`);
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("❌ Error eliminando:", err);
      alert("Error eliminando en el servidor.");
    }
  };

  // ===================== GUARDAR =====================

const handleSave = async () => {
  try {
    if (currentSection === "flights") {

      const payload = {
        aerolinea: formData.aerolinea,
        numeroVuelo: formData.numeroVuelo,
        origen: formData.origen,
        destino: formData.destino,
        fecha: formData.fecha,              // YYYY-MM-DD directo
        horaSalida: formData.horaSalida,    // HH:MM
        horaLlegada: formData.horaLlegada,  // HH:MM
        precio: Number(formData.precio),
        escalas: 0
      };

      if (dialogMode === "add") {
        const resp = await axios.post("http://localhost:8080/api/vuelos", payload);
        setFlights(prev => [...prev, resp.data]);
      } 
      
      else if (dialogMode === "edit" && selectedItem?.id) {
        const resp = await axios.put(
          `http://localhost:8080/api/vuelos/${selectedItem.id}`,
          payload
        );
        setFlights(prev => prev.map(f => f.id === selectedItem.id ? resp.data : f));
      }
    }

    if (currentSection === "users") {

      const payload = {
        nombre: formData.nombre,
        email: formData.email,
        rol: formData.rol || "usuario",
        passwordHash: formData.password || "123456"
      };

      if (dialogMode === "add") {
        const resp = await axios.post("http://localhost:8080/api/usuarios", payload);
        setUsers(prev => [...prev, resp.data]);
      } 
      
      else if (dialogMode === "edit" && selectedItem?.id) {
        const resp = await axios.put(
          `http://localhost:8080/api/usuarios/${selectedItem.id}`,
          payload
        );
        setUsers(prev => prev.map(u => u.id === selectedItem.id ? resp.data : u));
      }
    }

    setIsDialogOpen(false);

  } catch (err) {
    console.error("❌ Error guardando:", err);
    alert("Error guardando cambios en el servidor.");
  }
};

  // ===================== FILTROS =====================

  const filteredFlights = flights.filter((f) =>
    `${f.aerolinea} ${f.numeroVuelo} ${f.origen} ${f.destino}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const ingresos =
    bookings
      .filter((b) => b.estado === "activa" || b.estado === "confirmada")
      .reduce((sum, b) => sum + (b.vuelo?.precio ?? 0), 0) || 0;

  // ===================== UI =====================

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-[#1e3a5f] text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 border-b border-gray-700 flex items-center">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <Plane className="w-6 h-6 text-sky-400" />
              <span className="text-white">Sky</span>
              <span className="text-sky-400">Booker</span>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setCurrentSection("flights")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            ✈️ {isSidebarOpen && "Gestión de Vuelos"}
          </button>

          <button
            onClick={() => setCurrentSection("users")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            👤 {isSidebarOpen && "Usuarios"}
          </button>

          <button
            onClick={() => setCurrentSection("bookings")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            📄 {isSidebarOpen && "Reservas"}
          </button>
        </nav>

        <button
          onClick={onNavigateHome}
          className="absolute bottom-0 w-full p-4 border-t border-gray-700 hover:bg-gray-700"
        >
          <Home className="inline-block mr-2" />
          {isSidebarOpen && "Volver al inicio"}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* TITULO */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {currentSection === "flights"
            ? "Gestión de Vuelos"
            : currentSection === "users"
            ? "Usuarios Registrados"
            : currentSection === "bookings"
            ? "Reservas"
            : "Dashboard"}
        </h1>

        {/* BOTÓN AGREGAR */}
        {(currentSection === "flights" ||
          currentSection === "users") && (
          <Button
            onClick={handleAdd}
            className="mb-6 bg-sky-600 hover:bg-sky-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        )}

        {/* ========== TABLA DE VUELOS ========== */}
        {currentSection === "flights" && (
          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Aerolínea</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Salida</TableHead>
                  <TableHead>Llegada</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.id}</TableCell>
                    <TableCell>{flight.aerolinea}</TableCell>
                    <TableCell>{flight.numeroVuelo}</TableCell>
                    <TableCell>{flight.origen}</TableCell>
                    <TableCell>{flight.destino}</TableCell>
                    <TableCell>{flight.fecha}</TableCell>
                    <TableCell>{flight.horaSalida}</TableCell>
                    <TableCell>{flight.horaLlegada}</TableCell>
                    <TableCell>${flight.precio.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(flight)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 text-red-600 border-red-600"
                        onClick={() => handleDelete(flight.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Reservas, Usuarios y otras secciones se pueden añadir igual */}
      </main>

      {/* DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Agregar" : "Editar"} Vuelo
            </DialogTitle>
          </DialogHeader>

          {/* FORMULARIO */}
          <div className="space-y-4">
            <div>
              <Label>Aerolínea</Label>
              <Input
                value={formData.aerolinea || ""}
                onChange={(e) =>
                  setFormData({ ...formData, aerolinea: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Número de Vuelo</Label>
              <Input
                value={formData.numeroVuelo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, numeroVuelo: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Origen</Label>
                <Input
                  value={formData.origen || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, origen: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Destino</Label>
                <Input
                  value={formData.destino || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, destino: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Fecha (YYYY-MM-DD)</Label>
              <Input
                value={formData.fecha || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hora Salida</Label>
                <Input
                  value={formData.horaSalida || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, horaSalida: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Hora Llegada</Label>
                <Input
                  value={formData.horaLlegada || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, horaLlegada: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Precio</Label>
              <Input
                type="number"
                value={formData.precio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-sky-600" onClick={handleSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
