import { Image } from "@nextui-org/react";
import { Partner } from "../../models";
import { getClodinaryUrl } from "../../../../common";

interface PartnerCardProps {
  partners: Partner[];
}

export const PartnerCard = ({ partners }: PartnerCardProps) => {
  return (
    partners.length > 0 && (
      <div>
        {partners.map((partner, i) => (
          <Image key={i} src={getClodinaryUrl(partner.imageUrl)} width={500} />
        ))}
      </div>
    )
  );
};
