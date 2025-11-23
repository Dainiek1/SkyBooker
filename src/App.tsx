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
import { Vuelo } from "./types";

interface Usuario {
  nombre: string;
  email: string;
  rol: "admin" | "usuario";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "flights" | "booking" | "payment" | "profile" | "admin" | "auth"
  >("home");

  const [selectedFlight, setSelectedFlight] = useState<Vuelo | null>(null);
  const [passengerData, setPassengerData] = useState<any>(null);

  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.rol === "admin";

  const handleFlightSelect = (flight: Vuelo) => {
    setSelectedFlight(flight);
    setCurrentPage("booking");
  };

  const handleContinueToPayment = (passenger: any) => {
    setPassengerData(passenger);
    setCurrentPage("payment");
  };

  const handlePaymentConfirm = () => {
    setSelectedFlight(null);
    setPassengerData(null);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const handleShowAuth = () => {
    setCurrentPage("auth");
  };

  //  <-- login real
  const handleLogin = (user: Usuario) => {
    setCurrentUser(user);
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
          userName={currentUser?.nombre || ""}
        />
      )}

      {/* Routing */}
      {currentPage === "auth" ? (
        <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage("home")} />
      ) : currentPage === "home" ? (
        <main className="flex-1">
          <section className="relative min-h-[600px] px-6 py-20 flex items-center justify-center">
            <div className="max-w-6xl w-full">
              <FlightSearchForm
                onSearch={(filters: any) => {

                  sessionStorage.setItem("filters", JSON.stringify(filters));
                  setCurrentPage("flights");
                }}
              />
            </div>
          </section>
        </main>
      ) : currentPage === "flights" ? (
        <FlightSearchPage onFlightSelect={handleFlightSelect} />
      ) : currentPage === "booking" && selectedFlight ? (
        <BookingPage
          flight={selectedFlight}
          onCancel={() => setCurrentPage("flights")}
          onContinueToPayment={handleContinueToPayment}
        />
      ) : currentPage === "payment" && selectedFlight && passengerData ? (
        <PaymentPage
          flight={selectedFlight}
          passenger={passengerData}
          currentUser={currentUser || undefined}
          onCancel={() => setCurrentPage("booking")}
          onConfirm={handlePaymentConfirm}
        />
      ) : currentPage === "profile" ? (
        <ProfilePage
          user={currentUser || undefined}
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
