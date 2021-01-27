import { useMutation, useQueryCache } from "react-query";

import useAccessToken from "../useAccessToken";

import { apiUrl } from "../../auth/apiUrl";

const deleteVideoRequest = async ({ bookId, pageId, videoId, token }) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/books/${bookId}/pages/${pageId}/videos/${videoId}`,
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

const useDeleteVideo = () => {
  const { token } = useAccessToken() || {};

  const queryCache = useQueryCache();

  const [mutate] = useMutation(deleteVideoRequest, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

  return (bookId, pageId, videoId) => {
    mutate({ bookId, pageId, videoId, token });
  };
};

export default useDeleteVideo;
