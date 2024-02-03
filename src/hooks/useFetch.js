import { useEffect, useState } from 'react';

export const useFetch = (request, initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(request)
    .then(res => res.json())
    .then(
      rs => {
        setLoading(false);
        setData(rs);
      },
      err => {
        setLoading(false);
        setError(err);
      }
    )
// eslint-disable-next-line
  }, [request]);

  return {
    data,
    loading,
    error
  }
}
