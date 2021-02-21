import { useEffect, useState } from 'react';
import { User } from '_src/types/users';

interface UsersState {
  users: User[] | null;
  isFetching: boolean;
}

export function useUsers(): UsersState {
  const [state, setState] = useState<UsersState>({
    users: null,
    isFetching: true,
  });

  useEffect(() => {
    let cancelRequest = false;
    const loadUsers = async () => {
      let users = null;
      try {
        const res = await fetch('/api/users');
        users = await res.json();
      } catch (error) {
        console.log(error);
      }
      if (!cancelRequest) {
        setState({ users, isFetching: false });
      }
    };
    loadUsers();
    return () => {
      cancelRequest = true;
    };
  }, []);

  return state;
}
