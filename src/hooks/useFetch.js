import { useState, useEffect, useCallback } from "react";

export function useFetch(fetchFn) {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const loadData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: [], loading: false, error: err.message });
    }
  }, [fetchFn]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { ...state, refetch: loadData };
}
