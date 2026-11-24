import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Drawer, DrawerBody, DrawerContent } from "@heroui/drawer";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { MdLogout, MdMenu } from "react-icons/md";
import { authProvider } from "../../../core";
import { ROLE_LABELS } from "../../../models";
import { ADMIN_LINKS } from "../adminNavigation";
import { AdminNav } from "./AdminNav";

/**
 * Layout y guardia del área de administración: solo entra un usuario con rol
 * ADMIN y con el token confirmado por el servidor; si no, va a /login.
 * (La protección real está en la API; esto solo evita mostrar la interfaz.)
 */
export const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userData = authProvider((s) => s.userData);
  const verified = authProvider((s) => s.verified);
  const sessionValid = authProvider((s) => s.sessionValid);
  const logout = authProvider((s) => s.logout);
  const [checked, setChecked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = userData?.role === "ADMIN";

  // Confirma el token con el servidor una vez por visita.
  useEffect(() => {
    if (!isAdmin || verified) return;
    let cancelled = false;
    sessionValid().then(() => {
      if (!cancelled) setChecked(true);
    });
    return () => {
      cancelled = true;
    };
  }, [isAdmin, verified, sessionValid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!isAdmin) return <Navigate to="/login" replace state={{ from: pathname }} />;

  if (!verified && !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner color="secondary" label="Comprobando tu sesión…" />
      </div>
    );
  }

  const current = ADMIN_LINKS.find((link) =>
    link.to === "/admin" ? pathname === "/admin" || pathname === "/admin/" : pathname.startsWith(link.to),
  );

  const closeSession = () => {
    logout();
    addToast({ title: "Sesión cerrada", color: "success" });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen lg:pl-64">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <AdminNav />
      </aside>

      <Drawer
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        placement="left"
        size="xs"
        radius="none"
        classNames={{ base: "max-w-72 bg-secondary", closeButton: "text-secondary-foreground text-xl z-10" }}
      >
        <DrawerContent aria-label="Menú de administración">
          <DrawerBody className="p-0">
            <AdminNav onNavigate={() => setIsMenuOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-secondary/10 bg-background/90 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
        <Button
          isIconOnly
          variant="light"
          color="secondary"
          className="text-2xl lg:hidden"
          aria-label="Abrir menú de administración"
          onPress={() => setIsMenuOpen(true)}
        >
          <MdMenu aria-hidden="true" />
        </Button>
        <p className="min-w-0 grow truncate text-sm font-semibold text-muted">
          Administración <span aria-hidden="true">/</span>{" "}
          <span className="text-secondary">{current?.label ?? "Panel"}</span>
        </p>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 sm:pr-3"
              aria-label={`Cuenta de ${userData.name}`}
            >
              <Avatar name={userData.name} size="sm" color="secondary" />
              <span className="hidden text-left leading-tight sm:block">
                <span className="block max-w-40 truncate text-sm font-semibold text-secondary">
                  {userData.name}
                </span>
                <span className="block text-xs text-muted">{ROLE_LABELS[userData.role]}</span>
              </span>
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Opciones de la cuenta"
            disabledKeys={["perfil"]}
            onAction={(key) => {
              if (key === "sitio") navigate("/");
              if (key === "salir") closeSession();
            }}
          >
            <DropdownItem key="perfil" className="opacity-100 sm:hidden" textValue={userData.name}>
              <p className="font-semibold text-secondary">{userData.name}</p>
              <p className="text-xs text-muted">{ROLE_LABELS[userData.role]}</p>
            </DropdownItem>
            <DropdownItem key="sitio">Ver el sitio público</DropdownItem>
            <DropdownItem
              key="salir"
              color="danger"
              className="text-danger"
              startContent={<MdLogout aria-hidden="true" />}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>

      <main id="contenido" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
};
