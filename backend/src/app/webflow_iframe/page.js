import WebflowiFrame from "@/components/WebflowiFrame";
import { cookies, headers } from 'next/headers';

export default async function WebflowiFramePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('webflow_auth');

  return <WebflowiFrame sessionToken={sessionToken?.value} />;
};