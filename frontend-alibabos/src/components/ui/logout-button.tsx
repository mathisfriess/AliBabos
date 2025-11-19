"use client";

import { forwardRef } from "react";
import { Button } from "./button";
import { getKeycloak } from "../../config/keycloakConfig";
interface LogoutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  redirectUri?: string;
  label?: string;
}

export const LogoutButton = forwardRef<HTMLButtonElement, LogoutButtonProps>(
  ({ redirectUri, label = "Logout", onClick, ...rest }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
      const keycloak = getKeycloak();
      if (keycloak) {
        keycloak.logout({
          redirectUri: redirectUri || window.location.origin,
        });
      }
    };

    return (
      <Button ref={ref} onClick={handleClick} variant="outline" {...rest}>
        {label}
      </Button>
    );
  }
);

LogoutButton.displayName = "LogoutButton";
