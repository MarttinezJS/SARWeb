import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { addToast } from "@heroui/toast";
import { MdErrorOutline, MdLogin } from "react-icons/md";
import { CustomForm, InputForm } from "../../../common";
import { authProvider } from "../../../core";
import type { Response } from "../../../models";

interface LoginFields {
  username: string;
  password: string;
}

/** Mensaje claro según el motivo por el que falló el inicio de sesión. */
const loginError = (resp: Response<unknown>): string => {
  if (resp.status === 429)
    return "Demasiados intentos. Espera un minuto antes de volver a intentarlo.";
  if (resp.status === 400 || resp.status === 401) return "Usuario o contraseña incorrectos.";
  if (resp.status === 0) return resp.message;
  return resp.message || "No se pudo iniciar sesión. Inténtalo de nuevo.";
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = authProvider((s) => s.login);
  const userData = authProvider((s) => s.userData);
  const [error, setError] = useState<string>();
  // Ruta de administración desde la que se redirigió al login, si la hubo.
  const from = (location.state as { from?: string } | null)?.from;

  if (userData?.role === "ADMIN") return <Navigate to={from ?? "/admin"} replace />;

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center py-6 sm:py-12">
      <title>Iniciar sesión | Sigue Adelante Radio</title>
      <div className="surface p-6 sm:p-8">
        <img src="/logo.svg" alt="" className="mx-auto h-16 w-16" />
        <h1 className="title mt-3 text-center text-3xl font-bold text-secondary">
          Iniciar sesión
        </h1>
        <p className="mb-6 mt-1 text-center text-sm text-muted">
          Acceso para el equipo de Sigue Adelante Radio.
        </p>

        {userData && (
          <p className="mb-4 rounded-xl bg-primary-100 p-3 text-sm text-secondary">
            Tu cuenta ({userData.name}) no tiene acceso al panel de administración.
            Puedes entrar con otra cuenta.
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger-100 p-3 text-sm text-danger-600"
          >
            <MdErrorOutline aria-hidden="true" className="mt-0.5 shrink-0 text-lg text-danger" />
            {error}
          </p>
        )}

        <CustomForm<LoginFields>
          aria-label="Iniciar sesión"
          defaultValues={{ username: "", password: "" }}
          submitLabel="Entrar"
          loadingLabel="Entrando…"
          submitIcon={<MdLogin aria-hidden="true" />}
          submitFullWidth
          resetOnSuccess={false}
          onSubmit={async ({ username, password }, form) => {
            setError(undefined);
            const { pass, resp } = await login(username.trim(), password);
            if (!pass) {
              setError(loginError(resp));
              form.resetField("password");
              form.setFocus("password");
              return resp;
            }
            const user = authProvider.getState().userData;
            if (user?.role === "ADMIN") {
              addToast({ title: `Hola, ${user.name}`, color: "success" });
              navigate(from ?? "/admin", { replace: true });
            } else {
              addToast({
                title: "Sesión iniciada",
                description: "Tu cuenta no tiene acceso al panel de administración.",
                color: "warning",
              });
              navigate("/", { replace: true });
            }
            return resp;
          }}
        >
          <div className="space-y-5">
            <InputForm<LoginFields>
              name="username"
              label="Usuario"
              autoComplete="username"
              rules={{ required: "Escribe tu usuario" }}
            />
            <InputForm<LoginFields>
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              rules={{ required: "Escribe tu contraseña" }}
            />
          </div>
        </CustomForm>
      </div>
      <Link
        to="/"
        className="mt-4 self-center rounded text-sm font-semibold text-primary-900 hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
};
