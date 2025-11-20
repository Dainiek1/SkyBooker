import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Plane,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

interface AuthPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRecoverDialog, setShowRecoverDialog] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverSent, setRecoverSent] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Validación de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de contraseña
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!isValidEmail(loginEmail)) {
      setLoginError("Por favor ingresa un correo electrónico válido");
      return;
    }

    if (!loginPassword) {
      setLoginError("Por favor ingresa tu contraseña");
      return;
    }

    // Simular login exitoso
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof registerErrors = {};

    // Validar nombre
    if (!registerName.trim()) {
      errors.name = "El nombre es requerido";
    }

    // Validar email
    if (!registerEmail.trim()) {
      errors.email = "El correo electrónico es requerido";
    } else if (!isValidEmail(registerEmail)) {
      errors.email = "Por favor ingresa un correo electrónico válido";
    }

    // Validar contraseña
    if (!registerPassword) {
      errors.password = "La contraseña es requerida";
    } else if (!isValidPassword(registerPassword)) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    // Validar confirmación de contraseña
    if (!registerConfirmPassword) {
      errors.confirmPassword = "Debes confirmar tu contraseña";
    } else if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    setRegisterErrors(errors);

    // Si no hay errores, proceder con el registro
    if (Object.keys(errors).length === 0) {
      setRegisterSuccess(true);
      setTimeout(() => {
        onLogin();
      }, 2000);
    }
  };

  const handleRecoverPassword = () => {
    if (!isValidEmail(recoverEmail)) {
      return;
    }
    setRecoverSent(true);
  };

  const handleRecoverDialogClose = () => {
    setShowRecoverDialog(false);
    setRecoverEmail("");
    setRecoverSent(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.85), rgba(30, 58, 95, 0.85)), url('https://images.unsplash.com/photo-1710028267880-f34d75a5ead6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHdpbmRvdyUyMGNsb3VkcyUyMHNreXxlbnwxfHx8fDE3NjA2NzY5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-10 h-10 text-sky-400" />
            <div className="text-white">
              <span>Sky</span>
              <span className="text-sky-400">Booker</span>
            </div>
          </div>
          <p className="text-sky-200">Bienvenido al sistema de reservas</p>
        </div>

        {/* Auth Card */}
        <Card className="p-8 shadow-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="login-email" className="text-gray-700 mb-2 block">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        setLoginError("");
                      }}
                      className={`pl-10 border-gray-300 ${loginError ? "border-red-500" : ""}`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password" className="text-gray-700 mb-2 block">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError("");
                      }}
                      className={`pl-10 pr-10 border-gray-300 ${loginError ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-red-800">{loginError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowRecoverDialog(true)}
                    className="text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                >
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              {registerSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-gray-800 mb-2">¡Cuenta Creada Exitosamente!</h3>
                  <p className="text-gray-600">Redirigiendo...</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <Label htmlFor="register-name" className="text-gray-700 mb-2 block">
                      Nombre Completo
                    </Label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Juan Pérez"
                        value={registerName}
                        onChange={(e) => {
                          setRegisterName(e.target.value);
                          setRegisterErrors({ ...registerErrors, name: undefined });
                        }}
                        className={`pl-10 border-gray-300 ${registerErrors.name ? "border-red-500" : ""}`}
                      />
                    </div>
                    {registerErrors.name && (
                      <p className="text-red-600 mt-1">{registerErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-email" className="text-gray-700 mb-2 block">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={registerEmail}
                        onChange={(e) => {
                          setRegisterEmail(e.target.value);
                          setRegisterErrors({ ...registerErrors, email: undefined });
                        }}
                        className={`pl-10 border-gray-300 ${registerErrors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {registerErrors.email && (
                      <p className="text-red-600 mt-1">{registerErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-password" className="text-gray-700 mb-2 block">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => {
                          setRegisterPassword(e.target.value);
                          setRegisterErrors({ ...registerErrors, password: undefined });
                        }}
                        className={`pl-10 pr-10 border-gray-300 ${registerErrors.password ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {registerErrors.password && (
                      <p className="text-red-600 mt-1">{registerErrors.password}</p>
                    )}
                    {!registerErrors.password && registerPassword && (
                      <p className="text-gray-500 mt-1">Mínimo 6 caracteres</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-confirm-password" className="text-gray-700 mb-2 block">
                      Confirmar Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerConfirmPassword}
                        onChange={(e) => {
                          setRegisterConfirmPassword(e.target.value);
                          setRegisterErrors({ ...registerErrors, confirmPassword: undefined });
                        }}
                        className={`pl-10 pr-10 border-gray-300 ${registerErrors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {registerErrors.confirmPassword && (
                      <p className="text-red-600 mt-1">{registerErrors.confirmPassword}</p>
                    )}
                    {!registerErrors.confirmPassword && registerConfirmPassword && registerPassword === registerConfirmPassword && (
                      <p className="text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Las contraseñas coinciden
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      Al crear una cuenta, aceptas nuestros{" "}
                      <span className="text-sky-600 cursor-pointer hover:underline">
                        términos y condiciones
                      </span>{" "}
                      y{" "}
                      <span className="text-sky-600 cursor-pointer hover:underline">
                        política de privacidad
                      </span>
                      .
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                  >
                    Crear Cuenta
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Recover Password Dialog */}
      <Dialog open={showRecoverDialog} onOpenChange={handleRecoverDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Recuperar Contraseña</DialogTitle>
            <DialogDescription className="text-gray-600">
              {recoverSent
                ? "Te hemos enviado un correo con instrucciones"
                : "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"}
            </DialogDescription>
          </DialogHeader>

          {recoverSent ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-gray-700 mb-2">Correo Enviado</p>
              <p className="text-gray-600">
                Revisa tu bandeja de entrada en <strong>{recoverEmail}</strong>
              </p>
            </div>
          ) : (
            <div className="py-4">
              <Label htmlFor="recover-email" className="text-gray-700 mb-2 block">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  id="recover-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            {recoverSent ? (
              <Button
                onClick={handleRecoverDialogClose}
                className="w-full bg-sky-600 hover:bg-sky-700"
              >
                Entendido
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleRecoverDialogClose}
                  variant="outline"
                  className="flex-1 border-gray-300"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleRecoverPassword}
                  disabled={!isValidEmail(recoverEmail)}
                  className="flex-1 bg-sky-600 hover:bg-sky-700"
                >
                  Enviar Enlace
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
