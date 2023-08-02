import jwt from 'jsonwebtoken';
import { getServerSession } from "next-auth/next";
import WebflowRedirect from "@/components/WebflowRedirect";
import { getAccessToken } from '@/utils/webflow_helper';
import Token from "@/models/tokenSchema";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from '@/utils/dbConnect';
import { cookies } from 'next/headers';


// WebflowRedirectPage is a Server Component that handles the authentication process for a user's Webflow account.
export default async function WebflowRedirectPage(request) {
  const code = request.searchParams.code;

  // The authorize function is a Server Action that handles the process of authorizing a user with Webflow.
  async function authorize(code) {
    'use server'  // This is the "use server" directive, which denotes that this function is a Server Action in Next.js.

    try {
      // Check if the authorization code exists.
      if (code) {
        // Get the access token from Webflow using the authorization code.
        const token = await getAccessToken(code);
        if (token) {
          await dbConnect();

          // Get the server session.
          const session = await getServerSession(authOptions);

          // Create a JWT for the user's session.
          const idToken = jwt.sign({userId: session.user.id}, process.env.DESIGNER_EXT_JWT_SECRET, { expiresIn: '30d' });

          // Create a new token instance for storing in the database.
          const newToken = new Token({
            idToken,
            accessToken: token, // The Webflow API access token.
            userId: session.user.id // The user's id.
          });

          // Save the new token instance to the database.
          await newToken.save();

          // Set a cookie named 'webflow_auth' with the idToken as the value.
          cookies().set({
            name: 'webflow_auth',
            value: idToken,
            path: '/',
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 30 // 30 days
          });

          return true;
        }
      }
    } catch (error) {
      console.error(`Something failed getting the access token: ${error}`);
    }
    return false;
  }

  // Render the WebflowRedirect component with the authorize function as a prop.
  return (
    < WebflowRedirect authorize={authorize} code={code} />
  );
}
