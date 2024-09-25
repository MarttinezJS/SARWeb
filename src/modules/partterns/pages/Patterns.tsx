import { Partner } from "../models";
import { PaginatedTable } from "../../../common";
import { Endpoints } from "../config/endpoints";
import { FaImage } from "react-icons/fa6";
import { columns } from "../config/PartnerColumns";
import { FaCheck } from "react-icons/fa";
import { ActivePartnerModal, ImageModal } from "../components";
import { useActivePartnerModalStore, useImageModalStore } from "../hooks";

export const Patterns = () => {
  // const { isOpen: isOpenImage, onOpenChange: onChangeImage } = useDisclosure();
  const showImageModal = useImageModalStore((s) => s.showModal);
  const showActivePartnerModal = useActivePartnerModalStore((s) => s.showModal);
  return (
    <div className="p-2">
      <PaginatedTable<Partner>
        endpoint={Endpoints.PARTNERS}
        actions={[
          {
            label: "Logo",
            visibleIf: (partner) => partner.active,
            icon: <FaImage />,
            action: showImageModal,
          },
          {
            label: "Anunciar",
            visibleIf: (partner) => !partner.active,
            icon: <FaCheck />,
            action: showActivePartnerModal,
            color: "success",
          },
        ]}
        columns={columns}
      />
      <ImageModal />
      <ActivePartnerModal />
    </div>
  );
};
