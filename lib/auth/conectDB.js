import { MongoClient } from "mongodb";

export async function connectToDataBase() {
  const client = await MongoClient.connect(
    `mongodb://127.0.0.1:27017`
    // `mongodb+srv://${process.env.IDMONGO}:${process.env.PASSMONGO}@cluster0.is6dent.mongodb.net/ecommerce?retryWrites=true&w=majority`
  );

  return client;
}
