import { useState } from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import { MdOutlineBlock, MdOutlineEdit, MdPersonAddAlt } from "react-icons/md";
import {
  CustomForm,
  Endpoints,
  InputForm,
  PaginatedTable,
  save,
  SelectForm,
  type Action,
  type Column,
} from "../../../common";
import { ROLE_LABELS, type User, type UserFields } from "../../../models";
import { EMAIL_PATTERN } from "../../sponsors/partnerRules";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { NO_API_REASON } from "../components/ComingSoon";
import { FormModal } from "../components/FormModal";

const columns: Column<User>[] = [
  {
    id: "username",
    name: "Usuario",
    render: (user) => (
      <div className="flex min-w-0 items-center gap-3">
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size="sm"
          color="secondary"
          className="shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="truncate text-xs text-muted">@{user.username}</p>
        </div>
      </div>
    ),
  },
  { id: "email", name: "Correo", hideOnMobile: true },
  {
    id: "role",
    name: "Rol",
    render: (user) => (
      <Chip size="sm" variant="flat" color={user.role === "ADMIN" ? "secondary" : "default"}>
        {ROLE_LABELS[user.role] ?? user.role}
      </Chip>
    ),
  },
  {
    id: "active",
    name: "Estado",
    hideOnMobile: true,
    render: (user) => (
      <Chip size="sm" variant="dot" color={user.active ? "success" : "default"}>
        {user.active ? "Activo" : "Inactivo"}
      </Chip>
    ),
  },
];

// Editar y desactivar usuarios aún no existen en la API.
const actions: Action<User>[] = [
  {
    label: "Editar",
    icon: <MdOutlineEdit aria-hidden="true" />,
    action: () => {},
    disabled: true,
    disabledReason: NO_API_REASON,
  },
  {
    label: "Desactivar",
    icon: <MdOutlineBlock aria-hidden="true" />,
    color: "danger",
    action: () => {},
    disabled: true,
    disabledReason: NO_API_REASON,
  },
];

const ROLE_OPTIONS = [
  { key: "USUARIO", label: ROLE_LABELS.USUARIO },
  { key: "ADMIN", label: ROLE_LABELS.ADMIN },
];

export const AdminUsersPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <AdminPageHeader
        title="Usuarios"
        description="Cuentas con acceso al sitio. Solo los administradores pueden entrar a este panel."
      >
        <Button
          color="secondary"
          startContent={<MdPersonAddAlt aria-hidden="true" className="text-xl" />}
          onPress={() => setIsFormOpen(true)}
        >
          Nuevo usuario
        </Button>
      </AdminPageHeader>

      <PaginatedTable<User>
        aria-label="Usuarios registrados"
        endpoint={Endpoints.USERS}
        columns={columns}
        actions={actions}
        reloadKey={reloadKey}
        emptyContent="No hay usuarios registrados."
      />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Nuevo usuario"
        description="Entrega el usuario y la contraseña a la persona por un canal seguro."
      >
        <CustomForm<UserFields>
          aria-label="Nuevo usuario"
          defaultValues={{
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            role: "USUARIO",
          }}
          submitLabel="Crear usuario"
          loadingLabel="Creando…"
          actions={
            <Button variant="light" color="secondary" onPress={() => setIsFormOpen(false)}>
              Cancelar
            </Button>
          }
          onSubmit={async (data) => {
            const resp = await save<User>(Endpoints.USERS, {
              ...data,
              firstName: data.firstName.trim(),
              lastName: data.lastName.trim(),
              email: data.email.trim(),
              username: data.username.trim(),
            });
            if (resp.error) {
              addToast({
                title: "No se pudo crear el usuario",
                description: resp.message,
                color: "danger",
              });
              return resp;
            }
            addToast({ title: "Usuario creado", color: "success" });
            setReloadKey((key) => key + 1);
            setIsFormOpen(false);
            return resp;
          }}
        >
          <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <InputForm<UserFields>
              name="firstName"
              label="Nombres"
              autoComplete="off"
              rules={{ required: "Campo obligatorio" }}
            />
            <InputForm<UserFields>
              name="lastName"
              label="Apellidos"
              autoComplete="off"
              rules={{ required: "Campo obligatorio" }}
            />
            <InputForm<UserFields>
              name="email"
              label="Correo electrónico"
              type="email"
              autoComplete="off"
              rules={{
                required: "Campo obligatorio",
                pattern: { value: EMAIL_PATTERN, message: "Correo no válido" },
              }}
            />
            <InputForm<UserFields>
              name="username"
              label="Usuario"
              autoComplete="off"
              description="Sin espacios. Con él inicia sesión."
              rules={{
                required: "Campo obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._-]{3,30}$/,
                  message: "De 3 a 30 letras, números, punto, guion o guion bajo",
                },
              }}
            />
            <InputForm<UserFields>
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="new-password"
              rules={{
                required: "Campo obligatorio",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              }}
            />
            <SelectForm<UserFields>
              name="role"
              label="Rol"
              options={ROLE_OPTIONS}
              rules={{ required: "Elige un rol" }}
              description="Administrador: acceso completo a este panel."
            />
          </div>
        </CustomForm>
      </FormModal>
    </>
  );
};
