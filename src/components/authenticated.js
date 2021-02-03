import { signOut } from "next-auth/client";

export default function Authenticated({ user }) {
  return (
    <div>
      <p>Hello {user.name ?? user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
