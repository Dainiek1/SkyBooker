import { useState } from "react";
import { Header } from "./components/Header";
import { FlightSearchForm } from "./components/FlightSearchForm";
import { FlightSearchPage } from "./components/FlightSearchPage";
import { BookingPage } from "./components/BookingPage";
import { PaymentPage } from "./components/PaymentPage";
import { ProfilePage } from "./components/ProfilePage";
import { AdminDashboard } from "./components/AdminDashboard";
import { AuthPage } from "./components/AuthPage";
import { Footer } from "./components/Footer";

// 👇 Importa el tipo real que usa TODO el frontend ahora
import { Vuelo } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "flights" | "booking" | "payment" | "profile" | "admin" | "auth"
  >("home");

  // 👇 AHORA selectedFlight es un Vuelo del backend
  const [selectedFlight, setSelectedFlight] = useState<Vuelo | null>(null);
  const [passengerData, setPassengerData] = useState<any>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  const handleFlightSelect = (flight: Vuelo) => {
    console.log("✈️ Vuelo seleccionado:", flight);
    setSelectedFlight(flight);
    setCurrentPage("booking");
  };

  const handleBookingCancel = () => {
    setCurrentPage("flights");
  };

  const handleContinueToPayment = (passenger: any) => {
    console.log("🧍 Pasajero recibido en App:", passenger);
    setPassengerData(passenger);
    setCurrentPage("payment");
  };

  const handlePaymentCancel = () => {
    setCurrentPage("booking");
  };

  const handlePaymentConfirm = () => {
    // Luego de “pagar”, volvemos al home y limpiamos estados
    setCurrentPage("home");
    setSelectedFlight(null);
    setPassengerData(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleShowAuth = () => {
    setCurrentPage("auth");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage !== "admin" && currentPage !== "auth" && (
        <Header
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onLogin={handleShowAuth}
        />
      )}

      {currentPage === "auth" ? (
        <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage("home")} />
      ) : currentPage === "home" ? (
        <main className="flex-1">
          <section
            className="relative min-h-[600px] flex items-center justify-center px-6 py-20"
            style={{
              backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.7), rgba(30, 58, 95, 0.7)), url('https://images.unsplash.com/photo-1677230761040-fd78e9c2e9f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGFpcnBvcnQlMjB0ZXJtaW5hbHxlbnwxfHx8fDE3NjA2NzMwMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-white mb-4">Encuentra tu Vuelo Ideal</h1>
                <p className="text-sky-200 max-w-2xl mx-auto">
                  Reserva vuelos nacionales de forma fácil y rápida. 
                  Compara precios y encuentra las mejores opciones para tu próximo viaje.
                </p>
              </div>

              {/* 🔍 Buscador en el home que guarda filtros en sessionStorage */}
              <FlightSearchForm
                onSearch={(filters: any) => {
                  console.log("🏠 Filtros desde Home:", filters);
                  sessionStorage.setItem("filters", JSON.stringify(filters));
                  setCurrentPage("flights");
                }}
              />
            </div>
          </section>

          {/* Sección de beneficios */}
          {/* ... (tu sección de features tal como la tienes) ... */}
        </main>
      ) : currentPage === "flights" ? (
        <FlightSearchPage onFlightSelect={handleFlightSelect} />
      ) : currentPage === "booking" && selectedFlight ? (
        <BookingPage
          flight={selectedFlight}
          onCancel={handleBookingCancel}
          onContinueToPayment={handleContinueToPayment}
        />
      ) : currentPage === "payment" && selectedFlight && passengerData ? (
        <PaymentPage
          flight={selectedFlight}
          passenger={passengerData}
          onCancel={handlePaymentCancel}
          onConfirm={handlePaymentConfirm}
        />
      ) : currentPage === "profile" ? (
        <ProfilePage
          onNavigateHome={() => setCurrentPage("home")}
          onLogout={handleLogout}
        />
      ) : currentPage === "admin" ? (
        <AdminDashboard onNavigateHome={() => setCurrentPage("home")} />
      ) : null}

      {currentPage !== "admin" && currentPage !== "auth" && <Footer />}
    </div>
  );
}
