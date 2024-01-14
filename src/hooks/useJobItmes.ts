import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/constants";
import { jobItem } from "../lib/types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<jobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

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
    jobItems: jobItemsSliced,
    isLoading,
  };
}
