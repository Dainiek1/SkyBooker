// src/components/ProfilePage.tsx
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  User,
  Mail,
  FileText,
  Edit2,
  Save,
  X,
  LogOut,
  Home,
  Plane,
  Calendar,
  MapPin,
  Clock,
  CreditCard
} from "lucide-react";

// IMPORTA Usuario DESDE TU TYPES
import type { Usuario } from "../types";

interface ProfilePageProps {
  user: Usuario | undefined;
  onNavigateHome: () => void;
  onLogout: () => void;
}

// ---------------- MOCK DE RESERVAS -----------------
const mockBookings = [
  {
    id: "SKY-ABC123",
    airline: "Avianca",
    flightNumber: "AV123",
    origin: "Bogotá (BOG)",
    destination: "Medellín (MDE)",
    date: "15 Nov 2024",
    departureTime: "06:00",
    arrivalTime: "08:30",
    status: "completed",
    price: 280000
  },
  {
    id: "SKY-DEF456",
    airline: "LATAM",
    flightNumber: "LA456",
    origin: "Medellín (MDE)",
    destination: "Cartagena (CTG)",
    date: "28 Oct 2024",
    departureTime: "14:30",
    arrivalTime: "16:15",
    status: "completed",
    price: 350000
  },
  {
    id: "SKY-GHI789",
    airline: "Wingo",
    flightNumber: "WG789",
    origin: "Bogotá (BOG)",
    destination: "Cali (CLO)",
    date: "05 Dic 2024",
    departureTime: "10:00",
    arrivalTime: "11:45",
    status: "confirmed",
    price: 195000
  },
  {
    id: "SKY-JKL012",
    airline: "Avianca",
    flightNumber: "AV654",
    origin: "Cali (CLO)",
    destination: "Bogotá (BOG)",
    date: "10 Sep 2024",
    departureTime: "16:45",
    arrivalTime: "18:15",
    status: "cancelled",
    price: 305000
  }
];

// =======================================================
//             COMPONENTE PRINCIPAL ARREGLADO
// =======================================================
export function ProfilePage({ user, onNavigateHome, onLogout }: ProfilePageProps) {
  
  // Si no viene usuario, evita romper la vista
  const initialData = {
    nombre: user?.nombre || "Usuario SkyBooker",
    email: user?.email || "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialData);
  const [editedData, setEditedData] = useState(initialData);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700">Confirmado</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700">Completado</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const confirmedBookings = mockBookings.filter(b => b.status === "confirmed");
  const completedBookings = mockBookings.filter(b => b.status === "completed");
  const cancelledBookings = mockBookings.filter(b => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            {/* Avatar + Datos */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 bg-sky-600">
                <AvatarFallback className="text-white text-2xl">
                  {userData.nombre.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData.nombre}
                </h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <Button onClick={onNavigateHome} variant="outline">
                <Home className="w-4 h-4 mr-2" /> Inicio
              </Button>
              <Button onClick={onLogout} variant="outline" className="border-red-300 text-red-600">
                <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container mx-auto max-w-6xl px-6 py-8">

        <Tabs defaultValue="profile">

          {/* Pestañas */}
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="bookings">Mis Reservas</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          {/* ================= PERFIL ================= */}
          <TabsContent value="profile" className="space-y-6">

            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">

                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-600" />
                  <h2 className="text-gray-800">Información Personal</h2>
                </div>

                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="border-sky-600 text-sky-600">
                    <Edit2 className="w-4 h-4 mr-2" /> Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-sky-600 text-white">
                      <Save className="w-4 h-4 mr-2" /> Guardar
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="w-4 h-4 mr-2" /> Cancelar
                    </Button>
                  </div>
                )}
              </div>

              {/* Campos (solo nombre y email porque tu backend NO tiene más) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedData.nombre : userData.nombre}
                    onChange={(e) =>
                      setEditedData({ ...editedData, nombre: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedData.email : userData.email}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

              </div>
            </Card>
          </TabsContent>

          {/* ============ HISTORIAL DE RESERVAS ============ */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plane className="w-5 h-5 text-sky-600" />
                <h2 className="text-gray-800">Historial de Reservas</h2>
              </div>

              <div className="space-y-4">

                {mockBookings.map((booking) => (
                  <Card key={booking.id} className="p-4 border-gray-200">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                              <Plane className="w-5 h-5 text-sky-600" />
                            </div>
                            <div>
                              <p className="text-gray-800">{booking.airline}</p>
                              <p className="text-gray-500">{booking.flightNumber}</p>
                            </div>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <MapPin className="w-4 h-4 text-sky-600" />
                            <p className="text-gray-500">Ruta</p>
                            <p>{booking.origin}</p>
                            <p>{booking.destination}</p>
                          </div>

                          <div>
                            <Calendar className="w-4 h-4 text-sky-600" />
                            <p className="text-gray-500">Fecha</p>
                            <p>{booking.date}</p>
                          </div>

                          <div>
                            <Clock className="w-4 h-4 text-sky-600" />
                            <p className="text-gray-500">Horario</p>
                            <p>{booking.departureTime} - {booking.arrivalTime}</p>
                          </div>
                        </div>

                      </div>

                      <div className="text-right min-w-[150px]">
                        <p className="text-gray-500">Código</p>
                        <p className="text-gray-800">{booking.id}</p>
                        <p className="text-gray-500 mt-2">Total</p>
                        <p className="text-sky-600 font-bold">
                          ${booking.price.toLocaleString("es-CO")}
                        </p>
                      </div>

                    </div>
                  </Card>
                ))}

              </div>
            </Card>
          </TabsContent>

          {/* =============== ESTADÍSTICAS =============== */}
          <TabsContent value="stats" className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <Card className="p-6">
                <p className="text-gray-500">Total Vuelos</p>
                <p className="text-2xl">{mockBookings.length}</p>
              </Card>

              <Card className="p-6">
                <p className="text-gray-500">Confirmados</p>
                <p className="text-2xl">{confirmedBookings.length}</p>
              </Card>

              <Card className="p-6">
                <p className="text-gray-500">Completados</p>
                <p className="text-2xl">{completedBookings.length}</p>
              </Card>

            </div>

          </TabsContent>

        </Tabs>

      </div>

    </div>
  );
}
