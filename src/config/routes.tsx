import { BsCardImage } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { Route } from "../models";
import { GrConfigure } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa";

export const routes: Route[] = [
  {
    id: "devotional",
    title: "Devocionales",
    icon: <BsCardImage />,
    link: "/devotional",
  },
  {
    id: "news",
    title: "Noticias",
    icon: <FaRegNewspaper />,
    link: "/news",
  },
  {
    id: "patterns",
    title: "Patrocinadores",
    icon: <FaPeopleGroup />,
    link: "/patterns",
  },
  {
    id: "config",
    title: "Configuración",
    icon: <GrConfigure />,
    link: "/config",
  },
];
