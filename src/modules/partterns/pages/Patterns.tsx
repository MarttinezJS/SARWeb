import { useEffect, useState } from "react";
import { Partner } from "../models";
import { get } from "../../../common";
import { Endpoints } from "../config/endpoints";
import {
  Button,
  Chip,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaImage } from "react-icons/fa";

export const Patterns = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const getPartners = async () => {
    const { body } = await get<Partner[]>(Endpoints.PARTNERS);

    body && setPartners(body);
  };
  useEffect(() => {
    getPartners();
  }, []);

  return (
    <div className="p-2">
      <Table removeWrapper isStriped>
        <TableHeader>
          <TableColumn key="actions">{""}</TableColumn>
          <TableColumn key="id">#</TableColumn>
          <TableColumn key="companyName">Empresa</TableColumn>
          <TableColumn key="nit">NIT o CC</TableColumn>
          <TableColumn key="contact">Representante</TableColumn>
          <TableColumn key="contactNumber">Teléfono</TableColumn>
          <TableColumn key="email">Correo</TableColumn>
          <TableColumn key="active">Activo</TableColumn>
          <TableColumn key="amount">Donación</TableColumn>
          <TableColumn key="expirationDate">Fecha de caducidad</TableColumn>
          <TableColumn key="subscriptionDate">Fecha de suscripción</TableColumn>
        </TableHeader>
        <TableBody items={partners}>
          {(partner) => (
            <TableRow key={partner.id}>
              {(columnKey) => {
                const value = getKeyValue(partner, columnKey);
                let child;
                switch (columnKey) {
                  case "active":
                    child = (
                      <Chip variant="flat" color={value ? "success" : "danger"}>
                        {value ? "Activo" : "Inactivo"}
                      </Chip>
                    );

                    break;
                  case "actions":
                    child = (
                      <div>
                        <Button isIconOnly color="secondary" variant="light">
                          <FaImage />
                        </Button>
                        <Button isIconOnly color="secondary" variant="light">
                          <FaImage />
                        </Button>
                      </div>
                    );
                    break;
                  default:
                    child = value;
                    break;
                }
                return <TableCell>{child}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
