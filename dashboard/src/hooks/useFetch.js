import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchDate();
  }, [url]);

  return { loading, error, data };
};
export default useFetch;
