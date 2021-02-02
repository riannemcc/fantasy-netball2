import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";

const UnauthenticatedComponent = dynamic(() =>
  import("../src/components/unathenticated")
);
const AuthenticatedComponent = dynamic(() =>
  import("../src/components/authenticated")
);

export default function Profile() {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;

  if (!session) return <UnauthenticatedComponent />;

  return (
    <div>
      <AuthenticatedComponent user={session.user} />
      WHAT SHOULD GO ON THE PROFILE? TEAM NAME LINK TO TEAM SELECTION
      LEADERBOARD - TOP 10? UPCOMING GAMES? HIGHEST SCORING PLAYER
    </div>
  );
}

// show leaderboard here?
// upcoming games?
