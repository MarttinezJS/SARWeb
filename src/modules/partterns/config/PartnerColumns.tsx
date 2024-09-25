import { Chip } from "@nextui-org/react";
import { formatDate, Column } from "../../../common";
import { Partner } from "../models";

export const columns: Column<Partner>[] = [
  {
    id: "actions",
    name: "",
  },
  {
    id: "id",
    name: "#",
  },
  {
    id: "active",
    name: "Activo",
    render({ active }) {
      return (
        <Chip color={active ? "success" : "danger"}>
          {active ? "Anunciado" : "No anunciado"}
        </Chip>
      );
    },
  },
  {
    id: "companyName",
    name: "Empresa",
  },
  {
    id: "nit",
    name: "NIT o CC",
  },
  {
    id: "contact",
    name: "Representante",
  },
  {
    id: "contactNumber",
    name: "Teléfono",
  },
  {
    id: "email",
    name: "Correo",
  },
  {
    id: "amount",
    name: "Donación",
  },
  {
    id: "subscriptionDate",
    name: "Fecha de suscripción",
    render({ subscriptionDate }) {
      return <>{formatDate(subscriptionDate)}</>;
    },
  },
  {
    id: "expirationDate",
    name: "Fecha de caducidad",
    render({ expirationDate }) {
      return <>{formatDate(expirationDate)}</>;
    },
  },
];
