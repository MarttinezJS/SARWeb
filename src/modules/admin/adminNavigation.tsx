import type { ReactNode } from "react";
import {
  MdOutlineCampaign,
  MdOutlineDashboard,
  MdOutlineEvent,
  MdOutlineGroup,
  MdOutlineHandshake,
  MdOutlineMenuBook,
  MdOutlineNewspaper,
} from "react-icons/md";

export interface AdminLink {
  label: string;
  to: string;
  icon: ReactNode;
  /** Vista diseñada pero sin API todavía. */
  comingSoon?: boolean;
}

export const ADMIN_LINKS: AdminLink[] = [
  { label: "Panel", to: "/admin", icon: <MdOutlineDashboard /> },
  { label: "Promociones", to: "/admin/promociones", icon: <MdOutlineCampaign /> },
  { label: "Noticias", to: "/admin/noticias", icon: <MdOutlineNewspaper /> },
  { label: "Patrocinadores", to: "/admin/patrocinadores", icon: <MdOutlineHandshake /> },
  { label: "Devocionales", to: "/admin/devocionales", icon: <MdOutlineMenuBook /> },
  { label: "Usuarios", to: "/admin/usuarios", icon: <MdOutlineGroup /> },
  { label: "Eventos", to: "/admin/eventos", icon: <MdOutlineEvent />, comingSoon: true },
];
