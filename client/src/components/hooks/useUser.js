import { useQuery } from "react-query";
const apiUrl = process.env.REACT_APP_API_URL || "localhost:3000";

const getUserByToken = async (key, { token }) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const json = await response.json();

    if (json.error) throw new Error(json.error);

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const useUser = (token) => {
  return useQuery(["user", { token }], getUserByToken, {
    refetchOnWindowFocus: false,
    enabled: token,
  });
};

export default useUser;
