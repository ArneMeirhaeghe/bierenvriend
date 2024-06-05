import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchData = useCallback(() => {
    let isActive = true;
    fetch(url)
      .then((data) => data.json())
      .then((data) => isActive && setData(data))
      .catch((error) => isActive && setError(String(error)));
    return () => (isActive = false);
  }, [url]);
  useEffect(() => {
    return fetchData();
  }, [fetchData]);

  const invalidate = () => {
    fetchData();
  };
  const isLoading = !data && !error;
  return { data, error, isLoading, invalidate };
};
export default useFetch;
