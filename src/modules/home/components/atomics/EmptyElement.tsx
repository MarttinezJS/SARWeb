import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";
import { PiListBulletsFill } from "react-icons/pi";

export const EmptyElement = () => {
  return (
    <div className="p-5 flex items-center h-full justify-center">
      <Card>
        <CardHeader>
          <div className=" text-primary">
            <PiListBulletsFill size={200} />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Sin elementos agregados.</p>
        </CardBody>
      </Card>
    </div>
  );
};
