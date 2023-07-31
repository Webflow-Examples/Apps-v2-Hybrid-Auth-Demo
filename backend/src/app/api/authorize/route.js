import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getAccessToken } from '@/utils/webflow_helper';
import dbConnect from '@/utils/dbConnect';
import Token from '@/models/tokenSchema';

export async function POST(request) {
  try {
    const res = await request.json();
    const code = res.code;
    if (code) {
      const token = await getAccessToken(code);
      if (token) {
        const idToken = uuidv4();
        await dbConnect();
        const session = await getServerSession(authOptions);
        const newToken = new Token({
          idToken,
          accessToken: token,
          userId: session.user.id
        });
        await newToken.save();
        return new Response('Authorization successful!', {
          status: 200,
          headers: { 'Set-Cookie': `webflow_auth=${idToken}; Max-Age=2592000` },
          // headers: { 'Set-Cookie': `webflow_auth=${idToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000` },
        });
        // The Secure attribute will prevent the cookie from being sent on an insecure (HTTP) connection.
        // If you're testing locally over HTTP, you might not see the cookie being set. In a production environment,
        // It is a best practice to use the Secure attribute to ensure cookies containing sensitive information are only sent over HTTPS.
      }
    }
  } catch (error) {
    console.error(`Something failed getting the access token: ${error}`);
  }
  return new Response('Authorization failed!', {
    status: 401,
  });
}