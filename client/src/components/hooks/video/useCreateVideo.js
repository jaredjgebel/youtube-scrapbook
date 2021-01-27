import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

const apiUrl = process.env.REACT_APP_API_URL || "localhost:3000";

const createVideo = async ({ bookId, pageId, link, notes, token }) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/books/${bookId}/pages/${pageId}/videos`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ link, notes }),
      }
    );

    const json = await response.json();

    if (json.error) throw new Error(json.error);

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const useCreateVideo = () => {
  const { token } = useAccessToken() || {};
  const queryCache = useQueryCache();

  const [mutate] = useMutation(createVideo, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (bookId, pageId, link, notes) => {
    mutate({ bookId, pageId, link, notes, token });
  };
};

export default useCreateVideo;
