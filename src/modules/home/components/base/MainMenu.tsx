import { Listbox, ListboxItem } from "@nextui-org/react";
import {
  PiCalendar,
  PiHouseBold,
  PiListBulletsDuotone,
  PiPersonBold,
} from "react-icons/pi";
import { IconText } from "../atomics";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { authProvider } from "../../../../core";
export const MainMenu = () => {
  return (
    <div className="m-10 border-2 w-full rounded-lg bg-yellow-background p-10">
      <Listbox
        selectedKeys={"/"}
        aria-label="Listbox Variants"
        color="primary"
        variant="solid"
      >
        <ListboxItem key="/">
          <IconText
            icon={<PiHouseBold className="text-secondary" size="20px" />}
            text="Inicio"
          />
        </ListboxItem>
        <ListboxItem key="/about">
          <IconText
            icon={<PiPersonBold className="text-secondary" size="20px" />}
            text="Nosotros"
          />
        </ListboxItem>
        <ListboxItem key="/schedule">
          <IconText
            icon={
              <PiListBulletsDuotone className="text-secondary" size="20px" />
            }
            text="Programación"
          />
        </ListboxItem>
        <ListboxItem key="/events">
          <IconText
            icon={<PiCalendar className="text-secondary" size="20px" />}
            text="Nuestros eventos"
          />
        </ListboxItem>
        <ListboxItem key={authProvider.isAuthenticated ? "/config" : "login"}>
          {
            <IconText
              icon={
                authProvider.isAuthenticated ? (
                  <IoSettingsOutline />
                ) : (
                  <FaCircleArrowRight className="text-secondary" size="20px" />
                )
              }
              text={
                authProvider.isAuthenticated
                  ? "Configuración"
                  : "Iniciar sesión"
              }
            />
          }
        </ListboxItem>
      </Listbox>
    </div>
  );
};
