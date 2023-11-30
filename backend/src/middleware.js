import { NextResponse } from 'next/server';


/**
 * Middleware function for handling HTTP requests.
 *
 * @param {Object} request - The incoming HTTP request object.
 * @returns {Object} response - The response object with appropriate headers for CORS.
 *
 * This function checks if the incoming HTTP request is a preflight (OPTIONS) request.
 * If so, it sets up necessary CORS headers to the response and returns it.
 *
 * The 'Access-Control-Allow-Origin' header is set to the URL of the Webflow Designer extension,
 * which is stored as an environment variable.
 *
 * The 'Access-Control-Allow-Methods' header specifies the methods allowed when accessing the resource.
 *
 * The 'Access-Control-Allow-Headers' header is used in response to a preflight request 
 * to indicate which HTTP headers can be used when making the actual request.
 *
 * The 'NextResponse.next()' is a Next.js utility for creating a new response with some 
 * default headers, it can be used as a starting point to create a response.
 */
export async function middleware(request) {
  if (request.method === 'OPTIONS') {
      // This is a preflight request. Respond accordingly.
      const response = NextResponse.next();
      response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, WF-Authorization, Id-Token');
      return response;
  }
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