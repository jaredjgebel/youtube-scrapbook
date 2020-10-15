import React from "react";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
const apiUrl = process.env.REACT_APP_API_URL;

const useCreateBook = async ({ title }) => {
  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently();

  const [mutate] = useMutation(async () => {
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

    if (json.error) {
      throw new Error(json.error);
    }

    return { books: json.books };
  });

  try {
    return await mutate({ title });
  } catch (err) {
    return { error: err };
  }
};

export default useCreateBook;
