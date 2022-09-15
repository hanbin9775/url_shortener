import { User } from 'firebase/auth';
import { useEffect, useState, createContext, useContext } from 'react';

import FirebaseAuthClient from '../models/commons/firebase_auth_client.model';

interface UserContext {
  user: User | null;
}

export const userContext = createContext<UserContext>({
  user: null,
});

function useSession(): User | null {
  const { user } = useContext(userContext);
  return user;
}

function useAuth(): {
  initializing: boolean;
  haveUser: boolean;
  user: User | null;
} {
  const [state, setState] = useState(() => {
    const user = FirebaseAuthClient.getInstance().Auth.currentUser;
    return {
      initializing: true,
      haveUser: !!user,
      user,
    };
  });

  function onChange(user: User | null) {
    console.log('onChange');
    setState({ initializing: false, haveUser: !!user, user });
  }

  useEffect(() => {
    console.log('useEffect');
    // listen for auth state changes
    const unsubscribe = FirebaseAuthClient.getInstance().Auth.onAuthStateChanged(onChange);

    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
}

export { useAuth, useSession };
