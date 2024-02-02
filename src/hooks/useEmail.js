import { useContext, useEffect } from 'react';
import { UserContext } from '../context';

export const useEmail = () => {
  const { email, setEmail, user_id, setUserId } = useContext(UserContext);

  useEffect(() => {
    if (email === null || user_id === null || email === undefined || user_id === undefined) {
      fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/auth/userinfo`)
      .then(rs => rs.json())
      .then(({ id, email }) => {
        setEmail(email);
        setUserId(id);
      });
    }
  }, [email, setEmail, user_id, setUserId])

  return {
    email,
    user_id,
  }
}
