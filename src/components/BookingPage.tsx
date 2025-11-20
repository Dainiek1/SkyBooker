import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Plane, Calendar, Clock, User, Mail, Phone, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

import { Vuelo } from "../types";


interface BookingPageProps {
  flight: Vuelo;
  onCancel: () => void;
  onContinueToPayment: (passenger: any) => void;
}



export function BookingPage({ flight, onCancel, onContinueToPayment }: BookingPageProps) {
  const [passengerData, setPassengerData] = useState({
    fullName: "",
    documentType: "CC",
    documentNumber: "",
    email: "",
    phone: ""
  });

  const taxesAndFees = Math.round(flight.precio * 0.19);
  const totalPrice = flight.precio + taxesAndFees;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinueToPayment({
      name: passengerData.fullName,
      email: passengerData.email,
      documentType: passengerData.documentType,
      documentNumber: passengerData.documentNumber,
      phone: passengerData.phone
    });
  };

  const isFormValid = 
    passengerData.fullName.trim() !== "" &&
    passengerData.documentNumber.trim() !== "" &&
    passengerData.email.trim() !== "" &&
    passengerData.phone.trim() !== "";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Confirmar Reserva</h1>
          <p className="text-gray-600">Completa los datos del pasajero para confirmar tu reserva</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Information Card */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Plane className="w-5 h-5 text-sky-600" />
                  <h2 className="text-gray-800">Información del Vuelo</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Aerolínea</p>
                      <p className="text-gray-800">{flight.aerolinea}</p>
                      <p className="text-gray-500">{flight.numeroVuelo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 mb-1">Fecha</p>
                      <p className="text-gray-800">{flight.fecha || "17 Octubre 2025"}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-500 mb-1">Salida</p>
                      <p className="text-gray-800">{flight.horaSalida}</p>
                      <p className="text-gray-600">{flight.origen}</p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Clock className="w-4 h-4" />
                        <span>{flight.duracion}</span>
                      </div>
                      <div className="w-full h-[2px] bg-gray-300 relative">
                        <ArrowRight className="w-4 h-4 text-sky-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50" />
                      </div>
                     <p className="text-gray-500 mt-1">
  {(flight.escalas ?? 0) === 0
    ? "Directo"
    : `${flight.escalas} escala${flight.escalas! > 1 ? "s" : ""}`}
</p>



                      
              
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500 mb-1">Llegada</p>
                      <p className="text-gray-800">{flight.horaLlegada}</p>
                      <p className="text-gray-600">{flight.destino}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Passenger Information Card */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-sky-600" />
                  <h2 className="text-gray-800">Datos del Pasajero</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Ingrese nombre completo"
                      value={passengerData.fullName}
                      onChange={(e) => setPassengerData({ ...passengerData, fullName: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="documentType" className="text-gray-700">
                        Tipo de Documento *
                      </Label>
                      <select
                        id="documentType"
                        value={passengerData.documentType}
                        onChange={(e) => setPassengerData({ ...passengerData, documentType: e.target.value })}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      >
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                        <option value="TI">Tarjeta de Identidad</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="documentNumber" className="text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sky-600" />
                        Número de Documento *
                      </Label>
                      <Input
                        id="documentNumber"
                        type="text"
                        placeholder="Ingrese número de documento"
                        value={passengerData.documentNumber}
                        onChange={(e) => setPassengerData({ ...passengerData, documentNumber: e.target.value })}
                        className="mt-2 border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-sky-600" />
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={passengerData.email}
                      onChange={(e) => setPassengerData({ ...passengerData, email: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sky-600" />
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={passengerData.phone}
                      onChange={(e) => setPassengerData({ ...passengerData, phone: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Price Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h2 className="text-gray-800 mb-6">Resumen de Pago</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarifa base</span>
                    <span className="text-gray-800">${flight.precio.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos y tasas</span>
                    <span className="text-gray-800">${taxesAndFees.toLocaleString('es-CO')}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-800">Total</span>
                    <span className="text-sky-600">${totalPrice.toLocaleString('es-CO')}</span>
                  </div>
                </div>

                <Alert className="mb-6 bg-sky-50 border-sky-200">
                  <AlertDescription className="text-gray-700">
                    Continúa al siguiente paso para completar el pago de forma segura.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                  >
                    <span>Continuar al Pago</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
