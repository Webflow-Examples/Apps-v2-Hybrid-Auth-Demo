import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth/next";
import WebflowRedirect from "@/components/WebflowRedirect";
import { getAccessToken } from '@/utils/webflow_helper';
import Token from "@/models/tokenSchema";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from '@/utils/dbConnect';
import { cookies } from 'next/headers';


export default async function WebflowRedirectPage(request) {
  const code = request.searchParams.code;
  async function authorize(code) {
    'use server'
 
    try {
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

  return (
    < WebflowRedirect authorize={authorize} code={code} />
  );
}
