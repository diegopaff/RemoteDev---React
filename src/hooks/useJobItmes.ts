import { API_BASE_URL } from "../lib/constants";
import { jobItem } from "../lib/types";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "../lib/utils";

type jobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: jobItem[];
};

//create a callback function that fetches the api
const fetchJobItems = async (
  searchText: string
): Promise<jobItemsApiResponse> => {
  const res = await fetch(`${API_BASE_URL}?search=${searchText}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  const data = await res.json();
  return data;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => (searchText ? fetchJobItems(searchText) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  } as const;
}

//**-----------Using normal fetching-------- */
/*
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<jobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}?search=${searchText}`);
        const data = await res.json();

        setJobItems(data.jobItems);
        setIsLoading(false);
        if (!res.ok) return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchText]);

  return {
    jobItems,
    isLoading,
  };
}
*/
