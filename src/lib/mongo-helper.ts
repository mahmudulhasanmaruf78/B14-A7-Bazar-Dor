export function normalizeMongoUri(rawUri?: string): string {
  const defaultSrvUri =
    'mongodb+srv://BazarDor:BazarDor@cluster0.qagwlu2.mongodb.net/bazardor?retryWrites=true&w=majority&appName=Cluster0';

  const uri = rawUri || defaultSrvUri;

  // On Linux/Vercel serverless environments:
  // Direct shard cluster hostnames can cause OpenSSL SSL Alert 80.
  // Converting to standard modern SRV connection string works natively and reliably on Vercel:
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    if (uri.includes('ac-svm7p60-shard') || uri.includes('qagwlu2.mongodb.net')) {
      return defaultSrvUri;
    }
  }

  return uri;
}
