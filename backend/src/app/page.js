import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getAuthUrl } from "@/utils/webflow_helper";
import { cookies } from 'next/headers';

/**
 * Default exported async function for the Home component.
 * 
 * This function checks if the user has a session, and if not, redirects to the login page. 
 * If the user is logged in, it returns a main element that greets the user by name.
 * 
 * @returns {JSX.Element} - A main element with a welcome message for the logged-in user, 
 * or redirects to the login page if the user is not logged in.
 */
export default async function Home() {
  // Attempt to retrieve a session for the user.
  const session = await getServerSession(authOptions)

  // If no session exists, redirect to the login page.
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/')
  }

  // If there's no auth cookie, redirect to the Webflow OAuth page.
  const cookieStore = cookies();
  const webflow_auth = cookieStore.get('webflow_auth');
  if (!webflow_auth){
    redirect(getAuthUrl());
  }

  // If a session does exist, return a welcome message for the user.
  return (
    <main className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Home</h1>
        <p className="text-xl">Welcome {session.user.name}</p>
      </div>
    </main>
  )
}