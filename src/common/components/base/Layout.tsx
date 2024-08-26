import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Reproductor } from "./Reproductor";
import { IoMdExit } from "react-icons/io";
import { authProvider } from "../../../core";
import { LoginModal } from "../../modals";

interface MenuOptions {
  title: string;
  key: string;
}

const menuOptions: MenuOptions[] = [
  {
    title: "Inicio",
    key: "/",
  },
  {
    title: "Eventos",
    key: "/events",
  },
  {
    title: "Programación",
    key: "/schedule",
  },
  {
    title: "Nosotros",
    key: "/about",
  },
  {
    title: "Usuario",
    key: "/user",
  },
];

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const redirectTo = useNavigate();

  return (
    <div className="lg:h-screen-with-navbar">
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image src="/logo.svg" width={50} alt="Logo sigue adelante radio" />
            <p className="font-bold text-inherit">Sigue adelante radio</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuOptions.map((option) => {
            if (option.key == "/user" && !authProvider.isAuthenticated) {
              return <div key={option.key}></div>;
            }
            return (
              <NavbarItem
                isActive={currentPath == option.key}
                key={Math.random() * 100}
              >
                <Link
                  className="cursor-pointer"
                  color={currentPath != option.key ? "foreground" : undefined}
                  onPress={() => {
                    setCurrentPath(option.key);
                    redirectTo(option.key);
                  }}
                >
                  {option.title}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Reproductor />
          </NavbarItem>
          {authProvider.isAuthenticated ? (
            <NavbarItem>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  authProvider.logout();
                  redirectTo("/");
                }}
              >
                <p>Cerrar sesión</p>
                <IoMdExit size={25} />
              </Button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button
                className=" text-secondary"
                color="primary"
                variant="flat"
                onPress={() => onOpen()}
              >
                Login
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Link color={"primary"} className="w-full" size="lg">
              Cosa 1
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </div>
  );
};
