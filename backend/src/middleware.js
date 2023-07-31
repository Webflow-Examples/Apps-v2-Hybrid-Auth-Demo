import Token from '@/models/tokenSchema';
import { NextResponse } from 'next/server';
import dbConnect from './utils/dbConnect';
import mongoose from 'mongoose';


export async function middleware(request) {
  if (request.method === 'OPTIONS') {
    // This is a preflight request. Respond accordingly.
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }
  // const requestHeaders = new Headers(request.headers);
  // const authHeader = requestHeaders.get('Authorization');
  // if (authHeader) {
  //   const idToken = authHeader.split(' ')[1];
  //   try {
  //     // Look up the access token using the idToken
  //     const tokenData = await Token.findOne({ idToken });
  //     // If we have an access token, add it to the request object
  //     if (tokenData) {
  //       requestHeaders.set('WF-Authorization', tokenData.accessToken);
  //     }
  //   } catch (error) {
  //     debugger;
  //   }
  // }
  // const response = NextResponse.next({
  //   request: {
  //     headers: requestHeaders
  //   }
  // });

  // const origin = requestHeaders.get('origin');
  // if ( origin && origin === process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL ) {
  //   response.headers.set('Access-Control-Allow-Origin', origin);
  //   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //   response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //   // response.headers.set('Access-Control-Allow-Credentials', 'true');
  // }
  // return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}