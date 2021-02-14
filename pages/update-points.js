import { useSession } from "next-auth/client";

export default function UpdatePointsPage() {
  const [session, loading] = useSession()

  if (loading) {
    return <div>...loading</div>
  }

  if (session && session.isAdmin) {
    return <div>Stuff coming soon...</div>
  }

  return <div>This page is not for you ⛔</div>
}
