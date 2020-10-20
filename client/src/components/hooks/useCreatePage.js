import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "./useAccessToken";

const apiUrl = process.env.REACT_APP_API_URL;

const createPage = async ({ bookId, number, token }) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/books/${bookId}/pages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ number }),
    });

    const json = await response.json();

    if (json.error) throw new Error(json.error);

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const useCreatePage = () => {
  const { token, authError } = useAccessToken() || {};

  const queryCache = useQueryCache();

  const [mutate] = useMutation(createPage, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (bookId, number) => {
    mutate({ bookId, number, token });
  };
};

export default useCreatePage;
