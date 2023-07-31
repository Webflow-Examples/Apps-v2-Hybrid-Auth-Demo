import WebflowiFrame from "@/components/WebflowiFrame";
import { headers, cookies } from 'next/headers';

export default async function WebflowiFramePage() {
  var idToken = null;
  const headersList = headers()
  const referer = headersList.get('referer')
  if (referer?.includes(process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL)) {
    const cookieStore = cookies();
    idToken = cookieStore.get('webflow_auth'); 
  }

  return <WebflowiFrame idToken={idToken?.value} />;
};