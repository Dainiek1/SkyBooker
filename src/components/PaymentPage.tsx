import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { CreditCard, User, Plane, ArrowLeft } from "lucide-react";

import { Vuelo, Usuario } from "../types";

interface PaymentPageProps {
  flight: Vuelo;
  passenger: any;
  currentUser?: Usuario;   // ✅ ESTA ES LA PROP CORRECTA
  onCancel: () => void;
  onConfirm: () => void;
}

export function PaymentPage({
  flight,
  passenger,
  currentUser,
  onCancel,
  onConfirm,
}: PaymentPageProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <Card className="max-w-2xl w-full p-6 shadow-lg border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-sky-600" />
            Pago del Vuelo
          </h1>
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h2 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-sky-600" />
            Datos del Usuario
          </h2>

          <p className="text-gray-700"><strong>Nombre:</strong> {currentUser?.nombre || "No registrado"}</p>
          <p className="text-gray-700"><strong>Email:</strong> {currentUser?.email || "No registrado"}</p>
        </div>

        {/* Flight Info */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h2 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
            <Plane className="w-5 h-5 text-sky-600" />
            Información del Vuelo
          </h2>

          <p><strong>{flight.aerolinea}</strong> ({flight.numeroVuelo})</p>
          <p>{flight.origen} → {flight.destino}</p>
          <p>Fecha: {flight.fecha}</p>
          <p>Salida: {flight.horaSalida} — Llegada: {flight.horaLlegada}</p>
          <p className="text-sky-600 font-bold text-lg mt-2">
            ${flight.precio.toLocaleString("es-CO")}
          </p>
        </div>

        <Separator className="my-6" />

        {/* Payment Form */}
        <h2 className="text-gray-800 font-semibold text-lg mb-3">Método de Pago</h2>

        <div className="space-y-4">
          <div>
            <Label>Número de Tarjeta</Label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Fecha Expiración</Label>
              <Input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <Label>CVV</Label>
              <Input
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3 text-lg"
          onClick={onConfirm}
        >
          Confirmar Pago
        </Button>
      </Card>
    </div>
  );
}
