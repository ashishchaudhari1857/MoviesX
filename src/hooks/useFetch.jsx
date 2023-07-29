import { useState, useEffect } from "react";
import { fetchDataFromAPi } from "../utils/api";
import React from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading("loading....");
      setError(null);
      setData(null);
      try {
        const res = await fetchDataFromAPi(url);
        setLoading(false);
        setData(res);
      } catch (err) {
        setLoading(false);
        setError("something Went wrong");
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
