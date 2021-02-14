import { useSession } from "next-auth/client";

export default function UpdatePointsPage({ currentUser }) {
  const [, loading] = useSession()

  if (loading) {
    return <div>...loading</div>
  }

  if (currentUser && currentUser.isAdmin) {
    return <div>Stuff coming soon...</div>
  }

  return <div>This page is not for you ⛔</div>
}
