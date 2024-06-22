import { useEffect, useState } from 'react';

export const useFetch = (request, opts, initialState) => {
  const { auth } = opts;
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const headers = {};

  if (auth === true) {
    headers.SA = localStorage.getItem("st");
  }

  useEffect(() => {
    setLoading(true);
    fetch(request, { headers })
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
