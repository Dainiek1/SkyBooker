import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
  Menu,
  X,
  Home,
  DollarSign,
  TrendingUp,
  UserCheck
} from "lucide-react";

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

// Mock data
const mockFlights = [
  { id: 1, airline: "Avianca", flightNumber: "AV123", origin: "BOG", destination: "MDE", price: 280000, status: "active", schedule: "06:00" },
  { id: 2, airline: "LATAM", flightNumber: "LA456", origin: "BOG", destination: "CTG", price: 320000, status: "active", schedule: "09:15" },
  { id: 3, airline: "Wingo", flightNumber: "WG789", origin: "MDE", destination: "CLO", price: 195000, status: "active", schedule: "12:30" },
  { id: 4, airline: "Avianca", flightNumber: "AV321", origin: "CTG", destination: "BOG", price: 340000, status: "cancelled", schedule: "15:45" },
  { id: 5, airline: "LATAM", flightNumber: "LA654", origin: "CLO", destination: "MDE", price: 210000, status: "active", schedule: "18:00" },
];

const mockUsers = [
  { id: 1, name: "María González", email: "maria.gonzalez@email.com", document: "1012345678", role: "user", status: "active", bookings: 5 },
  { id: 2, name: "Carlos Rodríguez", email: "carlos.rodriguez@email.com", document: "1023456789", role: "user", status: "active", bookings: 3 },
  { id: 3, name: "Ana Martínez", email: "ana.martinez@email.com", document: "1034567890", role: "user", status: "active", bookings: 8 },
  { id: 4, name: "Juan Pérez", email: "juan.perez@email.com", document: "1045678901", role: "admin", status: "active", bookings: 2 },
  { id: 5, name: "Laura Sánchez", email: "laura.sanchez@email.com", document: "1056789012", role: "user", status: "inactive", bookings: 1 },
];

const mockBookings = [
  { id: "SKY-001", user: "María González", flight: "AV123 BOG-MDE", date: "2024-12-05", price: 280000, status: "confirmed" },
  { id: "SKY-002", user: "Carlos Rodríguez", flight: "LA456 BOG-CTG", date: "2024-12-10", price: 320000, status: "confirmed" },
  { id: "SKY-003", user: "Ana Martínez", flight: "WG789 MDE-CLO", date: "2024-11-28", price: 195000, status: "completed" },
  { id: "SKY-004", user: "Juan Pérez", flight: "AV321 CTG-BOG", date: "2024-11-15", price: 340000, status: "cancelled" },
  { id: "SKY-005", user: "Laura Sánchez", flight: "LA654 CLO-MDE", date: "2024-12-15", price: 210000, status: "confirmed" },
];

const mockPayments = [
  { id: "PAY-001", booking: "SKY-001", user: "María González", amount: 280000, method: "Tarjeta", date: "2024-11-20", status: "completed" },
  { id: "PAY-002", booking: "SKY-002", user: "Carlos Rodríguez", amount: 320000, method: "PSE", date: "2024-11-22", status: "completed" },
  { id: "PAY-003", booking: "SKY-003", user: "Ana Martínez", amount: 195000, method: "Tarjeta", date: "2024-11-10", status: "completed" },
  { id: "PAY-004", booking: "SKY-004", user: "Juan Pérez", amount: 340000, method: "Efectivo", date: "2024-11-05", status: "refunded" },
  { id: "PAY-005", booking: "SKY-005", user: "Laura Sánchez", amount: 210000, method: "PSE", date: "2024-11-25", status: "pending" },
];

type Section = "overview" | "flights" | "users" | "bookings" | "payments";

export function AdminDashboard({ onNavigateHome }: AdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState<Section>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setDialogMode("edit");
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string | number) => {
    if (confirm("¿Estás seguro de eliminar este elemento?")) {
      // Lógica de eliminación
      console.log("Eliminar:", id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      active: { label: "Activo", className: "bg-green-100 text-green-700" },
      inactive: { label: "Inactivo", className: "bg-gray-100 text-gray-700" },
      cancelled: { label: "Cancelado", className: "bg-red-100 text-red-700" },
      confirmed: { label: "Confirmado", className: "bg-green-100 text-green-700" },
      completed: { label: "Completado", className: "bg-blue-100 text-blue-700" },
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
      refunded: { label: "Reembolsado", className: "bg-purple-100 text-purple-700" },
    };

    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-700" };
    return <Badge className={`${config.className} hover:${config.className}`}>{config.label}</Badge>;
  };

  const menuItems = [
    { id: "overview" as Section, label: "Dashboard", icon: BarChart3 },
    { id: "flights" as Section, label: "Gestión de Vuelos", icon: Plane },
    { id: "users" as Section, label: "Gestión de Usuarios", icon: Users },
    { id: "bookings" as Section, label: "Reservas", icon: Calendar },
    { id: "payments" as Section, label: "Pagos", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-[#1e3a5f] text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} flex-shrink-0`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <Plane className="w-6 h-6 text-sky-400" />
              <span className="text-white">Sky</span>
              <span className="text-sky-400">Booker</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-700 rounded-lg">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentSection === item.id
                    ? "bg-sky-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={onNavigateHome}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Volver al Inicio</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-800">
              {menuItems.find(item => item.id === currentSection)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-gray-300"
                />
              </div>
              <Button variant="outline" className="border-gray-300">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Overview Section */}
          {currentSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-sky-600" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-500 mb-1">Total Vuelos</p>
                  <p className="text-gray-800">{mockFlights.length}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-500 mb-1">Usuarios Activos</p>
                  <p className="text-gray-800">{mockUsers.filter(u => u.status === "active").length}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-500 mb-1">Reservas Activas</p>
                  <p className="text-gray-800">{mockBookings.filter(b => b.status === "confirmed").length}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-500 mb-1">Ingresos Mes</p>
                  <p className="text-gray-800">${mockPayments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0).toLocaleString('es-CO')}</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-gray-800 mb-4">Reservas Recientes</h2>
                  <div className="space-y-3">
                    {mockBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-gray-800">{booking.user}</p>
                          <p className="text-gray-500">{booking.flight}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-gray-800 mb-4">Pagos Recientes</h2>
                  <div className="space-y-3">
                    {mockPayments.slice(0, 5).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-gray-800">{payment.user}</p>
                          <p className="text-gray-500">${payment.amount.toLocaleString('es-CO')} - {payment.method}</p>
                        </div>
                        {getStatusBadge(payment.status)}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Flights Section */}
          {currentSection === "flights" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-800">Lista de Vuelos</h2>
                <Button onClick={handleAdd} className="bg-sky-600 hover:bg-sky-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Vuelo
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Aerolínea</TableHead>
                    <TableHead>Número de Vuelo</TableHead>
                    <TableHead>Ruta</TableHead>
                    <TableHead>Horario</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFlights.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell>{flight.id}</TableCell>
                      <TableCell>{flight.airline}</TableCell>
                      <TableCell>{flight.flightNumber}</TableCell>
                      <TableCell>{flight.origin} → {flight.destination}</TableCell>
                      <TableCell>{flight.schedule}</TableCell>
                      <TableCell>${flight.price.toLocaleString('es-CO')}</TableCell>
                      <TableCell>{getStatusBadge(flight.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(flight)}
                            variant="outline"
                            size="sm"
                            className="border-sky-600 text-sky-600 hover:bg-sky-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(flight.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Users Section */}
          {currentSection === "users" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-800">Lista de Usuarios</h2>
                <Button onClick={handleAdd} className="bg-sky-600 hover:bg-sky-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Usuario
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Reservas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.document}</TableCell>
                      <TableCell>
                        <Badge className={user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}>
                          {user.role === "admin" ? "Admin" : "Usuario"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.bookings}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(user)}
                            variant="outline"
                            size="sm"
                            className="border-sky-600 text-sky-600 hover:bg-sky-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(user.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Bookings Section */}
          {currentSection === "bookings" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-800">Lista de Reservas</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="confirmed">Confirmados</SelectItem>
                      <SelectItem value="completed">Completados</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Vuelo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.flight}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>${booking.price.toLocaleString('es-CO')}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(booking)}
                            variant="outline"
                            size="sm"
                            className="border-sky-600 text-sky-600 hover:bg-sky-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(booking.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Payments Section */}
          {currentSection === "payments" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-800">Lista de Pagos</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="completed">Completados</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="refunded">Reembolsados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pago</TableHead>
                    <TableHead>Reserva</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.booking}</TableCell>
                      <TableCell>{payment.user}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>${payment.amount.toLocaleString('es-CO')}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(payment)}
                            variant="outline"
                            size="sm"
                            className="border-sky-600 text-sky-600 hover:bg-sky-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "add" ? "Agregar" : "Editar"} {currentSection === "flights" ? "Vuelo" : currentSection === "users" ? "Usuario" : "Elemento"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentSection === "flights" && (
              <>
                <div>
                  <Label htmlFor="airline">Aerolínea</Label>
                  <Input id="airline" placeholder="Ej: Avianca" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="flightNumber">Número de Vuelo</Label>
                  <Input id="flightNumber" placeholder="Ej: AV123" className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="origin">Origen</Label>
                    <Input id="origin" placeholder="BOG" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="destination">Destino</Label>
                    <Input id="destination" placeholder="MDE" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" type="number" placeholder="280000" className="mt-2" />
                </div>
              </>
            )}
            {currentSection === "users" && (
              <>
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: María González" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@ejemplo.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="document">Documento</Label>
                  <Input id="document" placeholder="1012345678" className="mt-2" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-sky-600 hover:bg-sky-700" onClick={() => setIsDialogOpen(false)}>
              {dialogMode === "add" ? "Agregar" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
