import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "./useAccessToken";

const apiUrl = process.env.REACT_APP_API_URL;

const createBook = async ({ title, token }) => {
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

  return json.error ? json.error : { books: json.books };
};

const useCreateBook = () => {
  const { token, authError } = useAccessToken() || {};

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
