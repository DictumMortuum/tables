import { useContext, useEffect } from 'react';
import { UserContext } from '../context';
import { authProvider } from 'servus-react-login';

export const useEmail = () => {
  const { email, setEmail, user_id, setUserId } = useContext(UserContext);

  useEffect(() => {
    authProvider.getIdentity().then(identity => {
      const { user, id } = identity;
      setEmail(user);
      setUserId(id);
    }).catch(err => {
      console.log(err)
    })
  }, [email, setEmail, user_id, setUserId])

  return {
    email,
    user_id,
  }
}
