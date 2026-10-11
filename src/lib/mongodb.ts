import { MongoClient, Db } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb://BazarDor:BazarDor@ac-svm7p60-shard-00-00.qagwlu2.mongodb.net:27017,ac-svm7p60-shard-00-01.qagwlu2.mongodb.net:27017,ac-svm7p60-shard-00-02.qagwlu2.mongodb.net:27017/?ssl=true&authSource=admin&replicaSet=atlas-ibz2rb-shard-0&appName=Cluster0';

const dbName = process.env.MONGODB_DB_NAME || 'bazardor';

let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: MongoClient | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client;
} else {
  client = global._mongoClientPromise;
}

db = client.db(dbName);

export { client, db };
export default client;
