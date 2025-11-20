import { Plane, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface HeaderProps {
  onNavigate?: (page: "home" | "flights" | "profile" | "admin") => void;
  currentPage?: string;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  onLogin?: () => void;
}

export function Header({ onNavigate, currentPage, isLoggedIn, isAdmin, onLogin }: HeaderProps) {
  return (
    <header className="bg-[#1e3a5f] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <button 
          onClick={() => onNavigate?.("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Plane className="w-8 h-8 text-sky-400" />
          <div>
            <span className="text-white">Sky</span>
            <span className="text-sky-400">Booker</span>
          </div>
        </button>
        
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate?.("home")}
            className={`hover:text-sky-400 transition-colors ${currentPage === "home" ? "text-sky-400" : ""}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => onNavigate?.("flights")}
            className={`hover:text-sky-400 transition-colors ${currentPage === "flights" ? "text-sky-400" : ""}`}
          >
            Consultar Vuelos
          </button>
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => onNavigate?.("profile")}
                className={`hover:text-sky-400 transition-colors ${currentPage === "profile" ? "text-sky-400" : ""}`}
              >
                Mis Reservas
              </button>
              {isAdmin && (
                <button 
                  onClick={() => onNavigate?.("admin")}
                  className={`flex items-center gap-2 hover:text-sky-400 transition-colors ${currentPage === "admin" ? "text-sky-400" : ""}`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Avatar className="w-8 h-8 bg-sky-400">
                      <AvatarFallback className="text-white">MG</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onNavigate?.("profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onNavigate?.("admin")}>
                        <Shield className="w-4 h-4 mr-2" />
                        Panel Admin
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              onClick={onLogin}
              variant="outline" 
              className="bg-transparent text-white border-sky-400 hover:bg-sky-400 hover:text-white"
            >
              Iniciar Sesión
            </Button>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

