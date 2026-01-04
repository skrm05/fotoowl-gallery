import { useInfiniteQuery } from "@tanstack/react-query";
import { unsplashApi } from "../api/unsplash";

export const useUnsplashImages = () => {
  return useInfiniteQuery({
    queryKey: ["images"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const { data } = await unsplashApi.get(`/photos`, {
        params: { page: pageParam, per_page: 12 },
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
