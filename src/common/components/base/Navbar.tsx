import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { addToast } from "@heroui/toast";
import { clsx } from "clsx";
import { MdLogin } from "react-icons/md";
import { authProvider } from "../../../core";
import { ROLE_LABELS } from "../../../models";
import { PUBLIC_LINKS } from "./navigation";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userData = authProvider((s) => s.userData);
  const logout = authProvider((s) => s.logout);
  const isAdmin = userData?.role === "ADMIN";

  const closeSession = () => {
    logout();
    setIsMenuOpen(false);
    addToast({ title: "Sesión cerrada", color: "success" });
    navigate("/");
  };

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      height="4.5rem"
      isBordered
      classNames={{
        base: "bg-background/85 backdrop-blur-lg",
        wrapper: "px-4 sm:px-6 lg:px-8",
        menu: "bg-background/95 pt-6 gap-1",
      }}
    >
      <NavbarContent justify="start" className="gap-2">
        <NavbarMenuToggle
          className="h-10 w-10 text-secondary lg:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        />
        <NavbarBrand>
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src="/logo.svg" alt="" className="h-10 w-10" />
            {/* En móvil el nombre va en dos líneas para no chocar con la cuenta. */}
            <span className="title text-base font-bold uppercase leading-none tracking-tight text-secondary sm:text-xl">
              Sigue Adelante <span className="block text-primary-800 sm:inline">Radio</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-1 lg:flex" justify="center">
        {PUBLIC_LINKS.map((item) => (
          <NavbarItem key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                clsx(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-secondary hover:bg-secondary/10",
                )
              }
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {userData ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full"
                  aria-label={`Cuenta de ${userData.name}`}
                >
                  <Avatar
                    name={userData.name}
                    size="sm"
                    color="secondary"
                    isBordered
                    className="cursor-pointer"
                  />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Opciones de la cuenta"
                disabledKeys={["perfil"]}
                onAction={(key) => {
                  if (key === "admin") navigate("/admin");
                  if (key === "salir") closeSession();
                }}
              >
                <DropdownItem key="perfil" className="opacity-100" textValue={userData.name}>
                  <p className="font-semibold text-secondary">{userData.name}</p>
                  <p className="text-xs text-muted">{ROLE_LABELS[userData.role]}</p>
                </DropdownItem>
                {isAdmin ? (
                  <DropdownItem key="admin">Panel de administración</DropdownItem>
                ) : null}
                <DropdownItem key="salir" color="danger" className="text-danger">
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              to="/login"
              size="sm"
              color="secondary"
              radius="full"
              startContent={<MdLogin aria-hidden="true" className="text-base" />}
            >
              Ingresar
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {PUBLIC_LINKS.map((item) => (
          <NavbarMenuItem key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                clsx(
                  "block rounded-xl px-4 py-3 text-lg font-semibold",
                  isActive ? "bg-secondary text-secondary-foreground" : "text-secondary",
                )
              }
            >
              {item.label}
            </NavLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <NavLink
            to="/policy"
            onClick={() => setIsMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-lg font-semibold text-secondary"
          >
            Políticas de privacidad
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
};
