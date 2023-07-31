import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getAuthUrl } from "@/utils/webflow_helper";

export default async function WebflowInstallPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect(getAuthUrl())
  } else {
    redirect('/api/auth/signin?callbackUrl=/webflow_install')
  }
}