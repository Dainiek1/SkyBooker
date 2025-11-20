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

interface ProfilePageProps {
  onNavigateHome: () => void;
  onLogout: () => void;
}

// Mock user data
const mockUserData = {
  name: "María González Pérez",
  email: "maria.gonzalez@email.com",
  documentType: "CC",
  documentNumber: "1012345678",
  phone: "+57 300 123 4567",
  memberSince: "Enero 2024"
};

// Mock booking history
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

export function ProfilePage({ onNavigateHome, onLogout }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [editedData, setEditedData] = useState(mockUserData);

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
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmado</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Completado</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const confirmedBookings = mockBookings.filter(b => b.status === "confirmed");
  const completedBookings = mockBookings.filter(b => b.status === "completed");
  const cancelledBookings = mockBookings.filter(b => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 bg-sky-600">
                <AvatarFallback className="text-white text-2xl">
                  {userData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-gray-800 mb-1">{userData.name}</h1>
                <p className="text-gray-600">Miembro desde {userData.memberSince}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={onNavigateHome}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
              <Button 
                onClick={onLogout}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="bookings">Mis Reservas</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-600" />
                  <h2 className="text-gray-800">Información Personal</h2>
                </div>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-sky-600 text-sky-600 hover:bg-sky-50"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="bg-sky-600 hover:bg-sky-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-gray-300"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-sky-600" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    value={isEditing ? editedData.name : userData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    disabled={!isEditing}
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-sky-600" />
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedData.email : userData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    disabled={!isEditing}
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="documentType" className="text-gray-700 flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Tipo de Documento
                  </Label>
                  <select
                    id="documentType"
                    value={isEditing ? editedData.documentType : userData.documentType}
                    onChange={(e) => setEditedData({ ...editedData, documentType: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PA">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="documentNumber" className="text-gray-700 flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Número de Documento
                  </Label>
                  <Input
                    id="documentNumber"
                    value={isEditing ? editedData.documentNumber : userData.documentNumber}
                    onChange={(e) => setEditedData({ ...editedData, documentNumber: e.target.value })}
                    disabled={!isEditing}
                    className="border-gray-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-sky-600" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={isEditing ? editedData.phone : userData.phone}
                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plane className="w-5 h-5 text-sky-600" />
                <h2 className="text-gray-800">Historial de Reservas</h2>
              </div>

              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <Card key={booking.id} className="p-4 border border-gray-200">
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
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-sky-600 mt-1" />
                            <div>
                              <p className="text-gray-500">Ruta</p>
                              <p className="text-gray-800">{booking.origin}</p>
                              <p className="text-gray-800">{booking.destination}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-sky-600 mt-1" />
                            <div>
                              <p className="text-gray-500">Fecha</p>
                              <p className="text-gray-800">{booking.date}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-sky-600 mt-1" />
                            <div>
                              <p className="text-gray-500">Horario</p>
                              <p className="text-gray-800">{booking.departureTime} - {booking.arrivalTime}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end min-w-[150px]">
                        <div className="text-right">
                          <p className="text-gray-500">Código</p>
                          <p className="text-gray-800">{booking.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500">Total</p>
                          <p className="text-sky-600">${booking.price.toLocaleString('es-CO')}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Vuelos</p>
                    <p className="text-gray-800">{mockBookings.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Próximas Reservas</p>
                    <p className="text-gray-800">{confirmedBookings.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Completados</p>
                    <p className="text-gray-800">{completedBookings.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-gray-800 mb-6">Resumen de Actividad</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700">Reservas Confirmadas</span>
                  </div>
                  <span className="text-gray-800">{confirmedBookings.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Vuelos Completados</span>
                  </div>
                  <span className="text-gray-800">{completedBookings.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">Reservas Canceladas</span>
                  </div>
                  <span className="text-gray-800">{cancelledBookings.length}</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
