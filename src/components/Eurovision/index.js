import React from 'react';
import Create from './Create';
import { useEmail } from '../../hooks/useEmail';
import { useFetch } from '../../hooks/useFetch';

const Eurovision = () => {
  const { user_id } = useEmail();
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations`, undefined)

  if (loading) {
    return <>Loading...</>
  }

  if (data === undefined) {
    return <></>
  }

  const rs = data.filter(d => d.user_id === user_id);

  let d = {};
  let exists = false;
  if (rs.length > 0) {
    d = rs[0].boardgame;
    exists = true;
  }

  return (
    <Create user_id={user_id} data={d} exists={exists} />
  );
}

export default Eurovision;
export {
  Create
}
