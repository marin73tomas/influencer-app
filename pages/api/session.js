import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ user: session.user });
  } else {
    res.status(400).json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
