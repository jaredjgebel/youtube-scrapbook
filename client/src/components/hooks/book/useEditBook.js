import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

import { apiUrl } from "../../auth/apiUrl";

const editBookRequest = async ({ id, title, token }) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/books/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title }),
    });

    const json = await response.json();

    if (json.error) throw new Error(json.error);

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const useEditBook = () => {
  const { token } = useAccessToken() || {};

  const queryCache = useQueryCache();

  const [mutate] = useMutation(editBookRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (id, title) => {
    mutate({ id, title, token });
  };
};

export default useEditBook;
