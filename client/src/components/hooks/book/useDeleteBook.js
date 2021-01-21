import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

const apiUrl = process.env.REACT_APP_API_URL || "localhost:7000";

const deleteBookRequest = async ({ id, token }) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

const useDeleteBook = () => {
  const { token } = useAccessToken() || {};

  const queryCache = useQueryCache();

  const [mutate] = useMutation(deleteBookRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (id, title) => {
    mutate({ id, title, token });
  };
};

export default useDeleteBook;
