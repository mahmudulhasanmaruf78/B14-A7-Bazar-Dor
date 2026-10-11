import { MongoClient, Db } from 'mongodb';
import { normalizeMongoUri } from './mongo-helper';

const uri = normalizeMongoUri(process.env.MONGODB_URI);
const dbName = process.env.MONGODB_DB_NAME || 'bazardor';

let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: MongoClient | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
  });
  global._mongoClientPromise = client;
} else {
  client = global._mongoClientPromise;
}

db = client.db(dbName);

export { client, db };
export default client;
