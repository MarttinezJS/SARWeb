import { BsCardImage } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { Route } from "../models";

export const routes: Route[] = [
  {
    id: "devotional",
    title: "Devocionales",
    name: "devocionales",
    icon: <BsCardImage />,
    link: "/devotional",
  },
  {
    id: "news",
    title: "Noticias",
    name: "noticias",
    icon: <FaPeopleGroup />,
    link: "/news",
  },
  {
    id: "patterns",
    title: "Patrocinadores",
    name: "patrocinadores",
    icon: <FaPeopleGroup />,
    link: "/patterns",
  },
];
