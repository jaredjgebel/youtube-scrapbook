import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useAccessToken = () => {
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const retrievedToken = await getAccessTokenSilently();
        setToken(retrievedToken);
      } catch (error) {
        setAuthError(error);
      }
    })();
  }, [getAccessTokenSilently]);

  return { token, authError };
};

export default useAccessToken;
