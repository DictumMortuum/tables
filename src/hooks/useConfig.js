import React from 'react';
import { UserContext } from '../context';

const useHook = (cfg, defaultValue=null) => {
  const { state: { configurations } } = React.useContext(UserContext);

  if (configurations[cfg] === undefined) {
    return defaultValue;
  } else {
    return configurations[cfg];
  }
}

export default useHook;
