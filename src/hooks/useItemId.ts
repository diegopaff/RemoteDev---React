import { API_BASE_URL } from "../lib/constants";
import { jobItemApiResponse } from "../lib/types";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "../lib/utils";

//**---------------Using React Query-------- */

//create a callback function that fetches the api
export const fetchJobItem = async (id: number): Promise<jobItemApiResponse> => {
  const res = await fetch(`${API_BASE_URL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
};

export function useItemId(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  return {
    jobItemExpanded: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
}

//**-----------Using normal fetching-------- */
/* export function useItemId(id: number | null) {
  const [jobItem, setJobItem] = useState<jobItemExpanded | null>(null);
  const [isContentLoading, setIsContentLoading] = useState(false);

  useEffect(() => {
    setIsContentLoading(true);

    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await fetch(`${API_BASE_URL}/${id}`);
        const data = await res.json();

        setJobItem(data.jobItem);
        setIsContentLoading(false);
        if (!res.ok) return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return {
    jobItemExpanded: jobItem,
    isContentLoading,
  };
} */
