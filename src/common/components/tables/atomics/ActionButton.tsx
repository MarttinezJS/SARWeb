import { CircularProgress, Button, Tooltip } from "@heroui/react";
import { ReactNode, useState } from "react";

interface ActionButtonProps {
  label: string;
  color: "secondary" | "default" | "primary" | "success" | "warning" | "danger";
  action: () => Promise<void>;
  icon: ReactNode;
}

export const ActionButton = ({
  color,
  label,
  action,
  icon,
}: ActionButtonProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Tooltip key={Math.random() * 100} content={<p>{label}</p>}>
      <Button
        isIconOnly
        disabled={loading}
        color={loading ? "default" : color ?? "primary"}
        variant="light"
        onPress={async () => {
          setLoading(true);
          await action();
          setLoading(false);
        }}
      >
        {loading ? <CircularProgress color="primary" /> : icon}
      </Button>
    </Tooltip>
  );
};
