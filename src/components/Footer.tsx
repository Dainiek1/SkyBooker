import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-12 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sky-400 mb-4">Sobre SkyBooker</h3>
            <p className="text-gray-300">
              Tu plataforma confiable para reservar vuelos nacionales de manera rápida, 
              segura y al mejor precio.
            </p>
          </div>
          
          <div>
            <h3 className="text-sky-400 mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400" />
                <span className="text-gray-300">+57 601 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400" />
                <span className="text-gray-300">contacto@skybooker.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sky-400" />
                <span className="text-gray-300">Bogotá, Colombia</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sky-400 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#terminos" className="text-gray-300 hover:text-sky-400 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#privacidad" className="text-gray-300 hover:text-sky-400 transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#ayuda" className="text-gray-300 hover:text-sky-400 transition-colors">
                  Centro de Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 SkyBooker. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
