import { Card, CardBody, CircularProgress } from "@heroui/react";
import { CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";

interface LoadingSnackbar extends CustomContentProps {
  cargando: boolean;
}

export const LoadingSnackbar = forwardRef<HTMLDivElement, LoadingSnackbar>(
  ({ message }, ref) => {
    return (
      <SnackbarContent ref={ref}>
        <Card fullWidth className="bg-background">
          <CardBody>
            <div className="flex justify-evenly items-center">
              <CircularProgress size="sm" />
              <p className="text-secondary">{message}</p>
            </div>
          </CardBody>
        </Card>
      </SnackbarContent>
    );
  }
);
