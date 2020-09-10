import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonWithStyle from "../buttons/ButtonWithStyle";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <ButtonWithStyle
      onClick={() => loginWithRedirect({ screen_hint: "signup" })}
    >
      Sign Up
    </ButtonWithStyle>
  );
};

export default SignupButton;
