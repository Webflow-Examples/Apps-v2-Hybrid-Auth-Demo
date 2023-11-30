import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getAuthUrl } from "@/utils/webflow_helper";
import { cookies } from 'next/headers';


export default async function WebflowInstallPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/webflow_install');
  }

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('webflow_auth');
  if (sessionToken) {
    redirect('/');
  }

  redirect(getAuthUrl());
}