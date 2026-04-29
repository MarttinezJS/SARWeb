import { Button } from "@heroui/button";
import { useLocation, useNavigate } from "react-router";
import { MdAccountCircle } from "react-icons/md";

const menuItems: { label: string; view: string }[] = [
  { label: "Inicio", view: "/" },
  { label: "Nosotros", view: "about" },
  { label: "Programas", view: "programs" },
  { label: "Eventos", view: "news" },
  { label: "Patrocinadores", view: "sponsors" },
  { label: "Contacto", view: "contact" },
  { label: "Políticas", view: "policy" },
];
export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => console.log("Home")}
          >
            <div className="w-10 h-10 text-brand-gold group-hover:scale-110 transition-transform">
              <img src="/logo.svg" />
            </div>
            <h1 className="text-xl hidden sm:block font-black title tracking-tight uppercase">
              Sigue Adelante Radio
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <span
                key={item.view}
                onClick={() => navigate(item.view)}
                className={`nav-link cursor-pointer ${
                  location.pathname === item.view ? "nav-link-active" : ""
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="light" color="primary" isIconOnly>
              <MdAccountCircle className="w-full h-full" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
