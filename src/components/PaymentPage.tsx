import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";

import {
  Plane,
  Calendar,
  Clock,
  User,
  Mail,
  FileText,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowLeft,
  Lock,
  DollarSign
} from "lucide-react";

import { Vuelo } from "../types";

interface PaymentPageProps {
  flight: Vuelo;
  passenger: any;
  onCancel: () => void;
  onConfirm: () => void;
}

export function PaymentPage({ flight, passenger, onCancel, onConfirm }: PaymentPageProps) {

  console.log("💳 [PaymentPage] flight:", flight);
  console.log("💳 [PaymentPage] passenger:", passenger);

  // 🔒 Protección para evitar fallos si los datos no existen
  if (!flight || !passenger) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <Card className="p-6">
          <h1 className="text-red-600 mb-4">⚠️ Error en la Reserva</h1>
          <p className="text-gray-700">
            Los datos del vuelo o del pasajero no están disponibles.
          </p>

          <Button
            onClick={onCancel}
            className="mt-6 bg-sky-600 hover:bg-sky-700 text-white"
          >
            Volver
          </Button>
        </Card>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 🧠 ESTADOS Y LÓGICA
  // -------------------------------------------------------------

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Precios
  const subtotal = flight.precio;
  const taxes = Math.round(flight.precio * 0.19);
  const serviceFee = 15000;
  const total = subtotal + taxes + serviceFee;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    return cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) setCardNumber(formatCardNumber(value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "");
    if (clean.length <= 4) setExpiryDate(formatExpiryDate(clean));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "");
    if (clean.length <= 4) setCvv(clean);
  };

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        onConfirm();
      }, 3000);
    }, 2000);
  };

  // -------------------------------------------------------------
  // 🟢 PANTALLA DE CONFIRMACIÓN (pago exitoso)
  // -------------------------------------------------------------

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-sky-50 flex items-center justify-center px-6 py-12">
        <Card className="max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-green-600 mb-4">¡Reserva Completada con Éxito!</h1>
          <p className="text-gray-600 mb-6">
            Te enviamos un correo con los detalles a {passenger.email}
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-500">Código de Reserva</p>
            <p className="text-gray-800">
              SKY-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
          </div>

          <p className="text-gray-500">Redirigiendo...</p>
        </Card>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 🟦 PANTALLA PRINCIPAL DE PAGO
  // -------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <Button
            onClick={onCancel}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <h1 className="text-gray-800">Confirmar Pago y Reserva</h1>
          <p className="text-gray-600">Completa el proceso de pago de forma segura</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lado izquierdo: resumen */}
          <div className="lg:col-span-1 space-y-6">

            {/* Vuelo */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-5 h-5 text-sky-600" />
                <h2 className="text-gray-800">Detalles del Vuelo</h2>
              </div>
              <Separator className="mb-4" />

              <div className="space-y-3">
                <p className="text-gray-500">Aerolínea</p>
                <p className="text-gray-800">{flight.aerolinea}</p>

                <p className="text-gray-500">Número de vuelo</p>
                <p className="text-gray-800">{flight.numeroVuelo}</p>

                <p className="text-gray-500">Ruta</p>
                <p className="text-gray-800">{flight.origen} → {flight.destino}</p>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span className="text-gray-600">{flight.fecha}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span className="text-gray-600">{flight.horaSalida} - {flight.horaLlegada}</span>
                </div>
              </div>
              </Card>

            {/* Datos pasajero */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-sky-600" />
                <h2 className="text-gray-800">Pasajero</h2>
              </div>

              <Separator className="mb-4" />

              <p className="text-gray-800">{passenger.name}</p>
              <p className="text-gray-800">{passenger.email}</p>
              <p className="text-gray-800">
                {passenger.documentType}: {passenger.documentNumber}
              </p>
              <p className="text-gray-800">{passenger.phone}</p>
            </Card>

            {/* Resumen de precios */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-sky-600" />
                <h2 className="text-gray-800">Total</h2>
              </div>
              <Separator className="mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${subtotal.toLocaleString('es-CO')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (19%)</span>
                  <span className="text-gray-800">${taxes.toLocaleString('es-CO')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Cargo por servicio</span>
                  <span className="text-gray-800">${serviceFee.toLocaleString('es-CO')}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-sky-600">${total.toLocaleString('es-CO')}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Derecha: formulario de pago */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-sky-600" />
                <h2 className="text-gray-800">Información de Pago</h2>
              </div>

              <Alert className="mb-6 bg-sky-50 border-sky-200">
                <Lock className="w-4 h-4 text-sky-600" />
                <AlertDescription className="text-sky-800">
                  Tus datos son protegidos con encriptación segura.
                </AlertDescription>
              </Alert>

              {/* Método de pago */}
              <div className="mb-6">
                <Label className="mb-3 block text-gray-700">Método de pago</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === "credit"
                          ? "border-sky-600 bg-sky-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value="credit" id="credit" />
                      <CreditCard className="w-5 h-5 text-sky-600" />
                      Tarjeta Crédito
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === "debit"
                          ? "border-sky-600 bg-sky-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value="debit" id="debit" />
                      <CreditCard className="w-5 h-5 text-sky-600" />
                      Tarjeta Débito
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === "transfer"
                          ? "border-sky-600 bg-sky-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Building className="w-5 h-5 text-sky-600" />
                      PSE Transferencia
                    </label>

                  </div>
                </RadioGroup>
              </div>

              <Separator className="my-6" />

              {/* Tarjeta de crédito/débito */}
              {(paymentMethod === "credit" || paymentMethod === "debit") && (
                <div className="space-y-6">

                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Número de Tarjeta
                    </Label>
                    <div className="relative">
                      <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Nombre del Titular
                    </Label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        placeholder="Como aparece en la tarjeta"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 mb-2 block">
                        Fecha de Vencimiento
                      </Label>
                      <Input
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 mb-2 block">
                        CVV
                      </Label>
                      <Input
                        type="password"
                        placeholder="123"
                        value={cvv}
                        onChange={handleCvvChange}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* PSE */}
              {paymentMethod === "transfer" && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-gray-700 mb-2 block">
                      Banco
                    </Label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Seleccionar banco...</option>
                      <option>Bancolombia</option>
                      <option>Davivienda</option>
                      <option>BBVA</option>
                      <option>Banco de Bogotá</option>
                      <option>Occidente</option>
                    </select>
                  </div>

                  <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                    <p className="text-sky-800">
                      Serás redirigido a la plataforma segura de PSE.
                    </p>
                  </div>
                </div>
              )}

              <Separator className="my-8" />

              {/* Botones */}
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isProcessing}
                >
                  Cancelar
                </Button>

                <Button
                  onClick={handlePayment}
                  className="flex-1 bg-sky-600 hover:bg-sky-700 text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Finalizar Compra - ${total.toLocaleString('es-CO')}
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-6 text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Pago 100% seguro</span>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
