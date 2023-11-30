import { headers } from 'next/headers'
import { getAPIClient } from '@/utils/webflow_helper'
import { NextResponse } from 'next/server';
import Token from '@/models/tokenSchema';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';

export async function GET(request) {
  // Get the headers from the request
  const headersList = headers();

  // Check if the request has the 'WF-Authorization' header
  if (headersList.has('WF-Authorization')) {
    // Extract the authorization token from the header
    const authToken = headersList.get('WF-Authorization');
    const idToken = headersList.get('Id-Token');

    // Verify the authorization token using the secret key
    const data = jwt.verify(authToken, process.env.DESIGNER_EXT_JWT_SECRET);

    // Connect to the MongoDB database
    await dbConnect();

    // Find the token data in the database that matches the user ID from the JWT payload
    const tokenData = await Token.findOne({ userId: data.userId });

    // Extract the access token from the token data
    const accessToken = tokenData.accessToken;
    debugger
    // If there's no access token, return a 401 Unauthorized response
    if (!accessToken) {
      return NextResponse.json({ error: "No authorization token provided" }, { status: 401,  headers: { 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL } });
    }

    // Use the access token to create a Webflow API client
    const webflow = getAPIClient(accessToken, true);

    // Send a POST request to the '/token/resolve ' endpoint of the Webflow API
    // The token sent is the JWT from the Designer Extension API.
    const resp = await webflow.post("/token/resolve", { idToken });

    // Return the response data as JSON with a 200 OK status
    // And set the 'Access-Control-Allow-Origin' header to allow cross-origin requests
    return NextResponse.json(resp.data, { status: 200, headers: { 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL } });
  }

  // If something goes wrong, return a 500 Internal Server Error response
  return NextResponse.json({ error: "Something went wrong!" }, { status: 500, headers: { 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL } });
}