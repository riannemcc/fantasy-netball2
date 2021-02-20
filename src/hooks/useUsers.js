import { useEffect, useState } from 'react';

export function useUsers() {
  const [state, setState] = useState({
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
