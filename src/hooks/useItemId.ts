import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/constants";
import { jobItemExpanded } from "../lib/types";

export function useItemId(id: number | null) {
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
}
