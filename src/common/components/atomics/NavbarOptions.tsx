import { Link, NavbarItem } from "@heroui/react";
import { authProvider } from "../../../core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export const NavbarOptions = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const isAuthenticated = authProvider((s) => s.isAuthenticated);
  const redirectTo = useNavigate();
  return (
    <div>
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
    </div>
  );
};
