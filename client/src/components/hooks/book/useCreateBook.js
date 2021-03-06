import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

import { apiUrl } from "../../auth/apiUrl";

const createBook = async ({ title, token }) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/books`, {
      method: "POST",
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

const useCreateBook = () => {
  const { token } = useAccessToken() || {};

  const queryCache = useQueryCache();

  const [mutate] = useMutation(createBook, {
    // refetches user query to include new book
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (title) => {
    mutate({ title, token });
  };
};

export default useCreateBook;
