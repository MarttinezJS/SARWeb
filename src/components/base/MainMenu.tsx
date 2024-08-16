import { Listbox, ListboxItem, useDisclosure } from "@nextui-org/react";
import {
  PiCalendar,
  PiHouseBold,
  PiListBulletsDuotone,
  PiNotebookFill,
  PiPersonBold,
} from "react-icons/pi";
import { IconText } from "../atomics";
import { FaCircleArrowRight } from "react-icons/fa6";
import { LoginModal } from "../modals";
const MainMenu = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="m-10 border-2 w-full rounded-lg bg-yellow-background p-10">
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Listbox
        selectedKeys={"home"}
        aria-label="Listbox Variants"
        color="primary"
        onAction={(key) => {
          if (key == "login") {
            onOpen();
          }
        }}
        variant="solid"
      >
        <ListboxItem key="home">
          <IconText
            icon={<PiHouseBold className="text-secondary" size="20px" />}
            text="Inicio"
          />
        </ListboxItem>
        <ListboxItem key="about">
          <IconText
            icon={<PiPersonBold className="text-secondary" size="20px" />}
            text="Nosotros"
          />
        </ListboxItem>
        <ListboxItem key="devotional">
          <IconText
            icon={<PiNotebookFill className="text-secondary" size="20px" />}
            text="Devocional"
          />
        </ListboxItem>
        <ListboxItem key="programming">
          <IconText
            icon={
              <PiListBulletsDuotone className="text-secondary" size="20px" />
            }
            text="Programación"
          />
        </ListboxItem>
        <ListboxItem key="events">
          <IconText
            icon={<PiCalendar className="text-secondary" size="20px" />}
            text="Nuestros eventos"
          />
        </ListboxItem>
        <ListboxItem key="login">
          <IconText
            icon={<FaCircleArrowRight className="text-secondary" size="20px" />}
            text="Iniciar sesión"
          />
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default MainMenu;
