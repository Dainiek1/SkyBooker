// src/components/AuthPage.tsx
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Plane,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

// 🟦 Tipo que usa App.tsx
export interface Usuario {
  nombre: string;
  email: string;
  rol: "admin" | "usuario";
}

interface AuthPageProps {
  onLogin: (u: Usuario) => void;
  onBack: () => void;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState("login");

  // login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // registro
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState<any>({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // recuperar contraseña
  const [showRecoverDialog, setShowRecoverDialog] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverSent, setRecoverSent] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validaciones
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (p: string) => p.length >= 6;

  // 🔵 LOGIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!isValidEmail(loginEmail)) {
      setLoginError("Correo electrónico inválido");
      return;
    }

    if (!loginPassword) {
      setLoginError("Ingresa tu contraseña");
      return;
    }

    // 🔥 usuario simulado
    const user: Usuario = {
      nombre: loginEmail.includes("admin") ? "Administrador" : "Usuario registrado",
      email: loginEmail,
      rol: loginEmail.includes("admin") ? "admin" : "usuario",
    };

    sessionStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
  };

  // 🔵 REGISTRO
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: any = {};

    if (!registerName.trim()) errors.name = "El nombre es requerido";
    if (!isValidEmail(registerEmail))
      errors.email = "Correo electrónico inválido";
    if (!isValidPassword(registerPassword))
      errors.password = "Contraseña mínima 6 caracteres";
    if (registerPassword !== registerConfirmPassword)
      errors.confirmPassword = "Las contraseñas no coinciden";

    setRegisterErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setRegisterSuccess(true);

    const newUser: Usuario = {
      nombre: registerName,
      email: registerEmail,
      rol: "usuario",
    };

    sessionStorage.setItem("user", JSON.stringify(newUser));

    setTimeout(() => onLogin(newUser), 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.85), rgba(30, 58, 95, 0.85)), url('https://images.unsplash.com/photo-1710028267880-f34d75a5ead6')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* volver */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="w-full max-w-md">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-10 h-10 text-sky-400" />
            <div className="text-white">
              <span>Sky</span>
              <span className="text-sky-400">Booker</span>
            </div>
          </div>
          <p className="text-sky-200">Accede a tu cuenta</p>
        </div>

        <Card className="p-8 shadow-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <Input
                      type="email"
                      className="pl-10"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Contraseña</Label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-sky-600 text-white">
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            {/* REGISTRO */}
            <TabsContent value="register">
              {registerSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-700">¡Cuenta creada!</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <Label>Nombre completo</Label>
                    <Input
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                    />
                    {registerErrors.name && (
                      <p className="text-red-600 text-sm">
                        {registerErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    {registerErrors.email && (
                      <p className="text-red-600 text-sm">
                        {registerErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Contraseña</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    {registerErrors.password && (
                      <p className="text-red-600 text-sm">
                        {registerErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Confirmar Contraseña</Label>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerConfirmPassword}
                      onChange={(e) =>
                        setRegisterConfirmPassword(e.target.value)
                      }
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-red-600 text-sm">
                        {registerErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-sky-600 text-white">
                    Crear Cuenta
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
