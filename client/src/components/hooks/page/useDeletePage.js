import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

const apiUrl = process.env.REACT_APP_API_URL || "localhost:3000";

const deletePageRequest = async ({ bookId, pageId, token }) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/books/${bookId}/pages/${pageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const json = await response.json();

    if (json.error) throw new Error(json.error);

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const useDeletePage = () => {
  const { token } = useAccessToken() || {};

  const queryCache = useQueryCache();

  const [mutate] = useMutation(deletePageRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (bookId, pageId) => {
    mutate({ bookId, pageId, token });
  };
};

export default useDeletePage;
