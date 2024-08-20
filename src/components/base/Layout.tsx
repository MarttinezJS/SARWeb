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
} from "@nextui-org/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Sigue adelante radio</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Eventos
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Programación
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Nosotros
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              className="hidden lg:flex"
              color="primary"
              href="#"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem className="">
            <Link href="#">Login</Link>
          </NavbarItem>
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
