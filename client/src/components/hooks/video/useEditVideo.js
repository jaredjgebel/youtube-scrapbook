import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

const apiUrl = process.env.REACT_APP_API_URL || "localhost:3000";

const editVideo = async ({ bookId, pageId, videoId, notes, link, token }) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/books/${bookId}/pages/${pageId}/videos/${videoId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bookId, pageId, videoId, notes, link }),
      }
    );

    const json = await response.json();

    if (json.error) throw new Error(json.error);

    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const useEditVideo = () => {
  const { token } = useAccessToken() || {};
  const queryCache = useQueryCache();

  const [mutate] = useMutation(editVideo, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (bookId, pageId, videoId, notes, link) => {
    mutate({ bookId, pageId, videoId, notes, link, token });
  };
};

export default useEditVideo;
