import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { normalizeMongoUri } from '@/lib/mongo-helper';

export async function GET() {
  const envStatus = {
    has_MONGODB_URI: !!process.env.MONGODB_URI,
    MONGODB_URI_prefix: process.env.MONGODB_URI
      ? process.env.MONGODB_URI.substring(0, 18) + '...'
      : 'UNDEFINED',
    has_BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'UNDEFINED',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'UNDEFINED',
    has_GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    has_GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    has_GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
    has_GITHUB_CLIENT_SECRET: !!process.env.GITHUB_CLIENT_SECRET,
    VERCEL_URL: process.env.VERCEL_URL || 'UNDEFINED',
    VERCEL_ENV: process.env.VERCEL_ENV || 'UNDEFINED',
  };

  let dbConnection = 'not tested';
  let dbError = null;

  try {
    const uri = normalizeMongoUri(process.env.MONGODB_URI);
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    await client.db(process.env.MONGODB_DB_NAME || 'bazardor').command({ ping: 1 });
    dbConnection = 'SUCCESS';
    await client.close();
  } catch (err: unknown) {
    dbConnection = 'FAILED';
    dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    envStatus,
    dbConnection,
    dbError,
    timestamp: new Date().toISOString(),
  });
}
