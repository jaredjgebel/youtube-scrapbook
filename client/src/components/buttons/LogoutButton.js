import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonWithStyle from "../buttons/ButtonWithStyle";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <ButtonWithStyle
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </ButtonWithStyle>
  );
};

export default LogoutButton;
