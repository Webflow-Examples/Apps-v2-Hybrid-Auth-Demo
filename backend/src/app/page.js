import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/')
  }

  return (
    <main className="">
      <div>
        <h1>Home</h1>
        <p>Welcome {session.user.name}</p>
      </div>
    </main>
  )
}