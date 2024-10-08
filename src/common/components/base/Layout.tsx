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
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { authProvider } from "../../../core";
import { LoginModal } from "../modals";

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
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isAuthenticated, logout } = authProvider();
  const redirectTo = useNavigate();
  useEffect(() => {
    const routesNames = location.pathname.split("/");
    setCurrentPath(`/${routesNames[1]}`);
  }, [isAuthenticated]);

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
            if (option.key == "/user" && !isAuthenticated) {
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
          {/* <NavbarItem>
            <Reproductor />
          </NavbarItem> */}
          {isAuthenticated ? (
            <NavbarItem>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  logout();
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
            {menuOptions.map((option) =>
              option.key == "/user" && !isAuthenticated ? (
                <div key={option.key}></div>
              ) : (
                <Link
                  key={Math.random() * 10}
                  onPress={() => {
                    redirectTo(option.key);
                    setCurrentPath(option.key);
                  }}
                  color="secondary"
                  className="w-full"
                  size="lg"
                >
                  {option.title}
                </Link>
              )
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </div>
  );
};
