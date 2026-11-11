import { Link } from "react-router";
import { Button } from "@heroui/button";
import { MdSearchOff } from "react-icons/md";
import { EmptyState } from "../../../common";

export const NotFoundPage = () => (
  <div className="mx-auto max-w-xl py-10">
    <title>Página no encontrada | Sigue Adelante Radio</title>
    <h1 className="sr-only">Página no encontrada</h1>
    <EmptyState
      icon={<MdSearchOff />}
      title="No encontramos esta página"
      description="El enlace puede estar mal escrito o la página ya no existe."
    >
      <Button as={Link} to="/" color="secondary">
        Ir al inicio
      </Button>
    </EmptyState>
  </div>
);
