import { headers } from 'next/headers'
import { getAPIClient } from '@/utils/webflow_helper'
import { NextResponse } from 'next/server';
import Token from '@/models/tokenSchema';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET(request) {
  const headersList = headers();
  if (
    headersList.get('origin') === process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL
    && headersList.has('Authorization')
  ) {
    const authToken = headersList.get('Authorization');
    const idToken = authToken.split(' ')[1];
    const db = await mongoose.connect(MONGODB_URI)
    const tokenData = await Token.findOne({ idToken });
    const accessToken = tokenData.accessToken;

    if (!accessToken) {
      return NextResponse.json({ error: "No authorization token provided" }, { status: 401 });
    }

    const webflow = getAPIClient(accessToken);
    const resp = await webflow.get("/sites");
    return NextResponse.json(resp.data, { status: 200, headers: { 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_WEBFLOW_DESIGNER_EXT_URL } });
  }

  return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
}