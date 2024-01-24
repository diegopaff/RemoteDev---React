import { useQueries } from "@tanstack/react-query";
import { fetchJobItem } from "./useItemId";
import { handleError } from "../lib/utils";
import { jobItemExpanded } from "../lib/types";

//* HOOK: makes multiple fetch calls in parallel using react query*/
//* -------------------------------------------------------------*/
export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id), // same fetch function that used in useItemId.
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    //.filter((jobItem) => jobItem !== undefined); //--> filtro para undefined and null
    //.filter((jobItem) => !!jobItem); //--> filtro para undefined and null
    .filter((jobItem) => Boolean(jobItem)) as jobItemExpanded[]; //--> filtro para undefined and null

  const isLoading = results.some((result) => result.isLoading);

  return {
    jobItems,
    isLoading,
  };
}
