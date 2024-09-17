import { BsCardImage } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { Route } from "../models";
import { GrConfigure } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa";
import { MdEvent, MdOutlineSchedule } from "react-icons/md";

export const routes: Route[] = [
  {
    id: "devotional",
    title: "Devocionales",
    icon: <BsCardImage />,
  },
  {
    id: "schedules",
    title: "Programación",
    icon: <MdOutlineSchedule />,
  },
  {
    id: "events",
    title: "Eventos",
    icon: <MdEvent />,
  },
  {
    id: "news",
    title: "Noticias",
    icon: <FaRegNewspaper />,
  },
  {
    id: "patterns",
    title: "Patrocinadores",
    icon: <FaPeopleGroup />,
  },
  {
    id: "config",
    title: "Configuración",
    icon: <GrConfigure />,
  },
];
