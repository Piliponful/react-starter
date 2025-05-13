import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URL
if (!uri) {
  throw new Error('Missing MONGODB_URL in environment variables')
}

const client = new MongoClient(uri)
let connectedClientPromise

export async function getClient() {
  if (!connectedClientPromise) {
    connectedClientPromise = client.connect()
  }
  return connectedClientPromise
}

export async function getDb() {
  const connectedClient = await getClient()
  return connectedClient.db()
}
