import WebflowiFrame from "@/components/WebflowiFrame";
import { cookies } from 'next/headers';

export default async function WebflowiFramePage() {
  const cookieStore = cookies();
  const idToken = cookieStore.get('webflow_auth'); 

  return <WebflowiFrame idToken={idToken?.value} />;
};