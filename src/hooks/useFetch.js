import { useState, useEffect } from "react";

export function useFetch(fetchFn) {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFn();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({ data: [], loading: false, error: err.message });
      }
    };

    loadData();
  }, [fetchFn]);

  return state;
}
