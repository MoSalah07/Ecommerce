import { connectToDataBase } from "../../../lib/auth/conectDB";
import { unstable_getServerSession } from "next-auth/next";
import { NextOptions } from "../auth/[...nextauth]";

export default async function handlerGetOrders(req, res) {
  if (req.method !== "GET") {
    return res.status(401).send("Request method not supported");
  }

  const {
    user: { email },
  } = await unstable_getServerSession(req, res, NextOptions);

  const client = await connectToDataBase();

  const user = await client
    .db(process.env.DB)
    .collection(process.env.COLLECTION)
    .findOne({ email });

  if (!user) {
    res.status(401).send("Orders not found");
    client.close();
    return;
  }

  client.close();
  return res.status(200).send(user.orders);
}
