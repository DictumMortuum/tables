import { useContext, useEffect } from 'react';
import { UserContext } from '../context';
import { authProvider } from 'servus-react-login';

export const useEmail = () => {
  const { email, setEmail, user_id, setUserId, loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    authProvider.getIdentity().then(identity => {
      const { user, id } = identity;
      setEmail(user);
      setUserId(id);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      // console.log(err)
    })
  }, [email, setEmail, user_id, setUserId, setLoading])

  return {
    email,
    user_id,
    loading
  }
}
