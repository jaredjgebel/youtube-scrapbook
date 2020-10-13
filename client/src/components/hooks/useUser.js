import { useQuery } from "react-query";
const apiUrl = process.env.REACT_APP_API_URL;

const getUserByToken = async (key, { token }) => {
  const response = await fetch(`${apiUrl}/api/v1/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const json = await response.json();

  return json.error ? json.error : { user: json.user };
};

const useUser = (token) => {
  return useQuery(["user", { token }], getUserByToken);
};

export default useUser;
