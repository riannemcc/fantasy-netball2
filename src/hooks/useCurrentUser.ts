import { useEffect, useState } from 'react';
import { CurrentUser } from '_src/types/users';

interface CurrentUserState {
  currentUser: CurrentUser | null;
  isFetching: boolean;
}

export function useCurrentUser(): CurrentUserState {
  const [userState, setUserState] = useState<CurrentUserState>({
    currentUser: null,
    isFetching: true,
  });

  useEffect(() => {
    let cancelRequest = false;
    const loadUser = async () => {
      let currentUser = null;
      try {
        const res = await fetch('/api/current-user');
        currentUser = await res.json();
      } catch (error) {
        cancelRequest = true;
      }
      if (!cancelRequest) {
        setUserState({ currentUser, isFetching: false });
      }
    };
    loadUser();
    return () => {
      cancelRequest = true;
    };
  }, []);

  return userState;
}
