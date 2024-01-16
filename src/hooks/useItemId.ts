import { API_BASE_URL } from "../lib/constants";
import { jobItemExpanded } from "../lib/types";
import { useQuery } from "@tanstack/react-query";

//**---------------Using React Query-------- */
type jobItemApiResponse = {
  public: boolean;
  jobItem: jobItemExpanded;
};

//create a callback function that fetches the api
const fetchJobItem = async (id: number): Promise<jobItemApiResponse> => {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.descriptrion);
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
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;

  return {
    jobItemExpanded: jobItem,
    isLoading,
  };
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
