import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

interface CardBlurProps {
  children: ReactNode;
}
export const CardBlur = ({ children }: CardBlurProps) => {
  return (
    <Card shadow="none" className="p-3 backdrop-blur-sm bg-white/30">
      {children}
    </Card>
  );
};
