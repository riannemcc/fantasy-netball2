import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [userState, setUserState] = useState({
    currentUser: null,
    isFetching: true
  })

  useEffect(() => {
    let cancelRequest = false
    const loadUser = async () => {
      let currentUser = null
      try {
        const res = await fetch("/api/current-user");
        currentUser = await res.json();
      } catch (error) {
        cancelRequest = true
      }
      if (!cancelRequest) {
        setUserState({ currentUser, isFetching: false })
      }
    }
    loadUser()
    return () => {
      cancelRequest = true
    }
  }, [])

  return userState
}