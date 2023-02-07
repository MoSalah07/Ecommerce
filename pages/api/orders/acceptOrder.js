import { connectToDataBase } from "../../../lib/auth/conectDB";
import { unstable_getServerSession } from "next-auth/next";
import { NextOptions } from "../auth/[...nextauth]";

export default async function handlerAccperOrder(req, res) {
  if (req.method !== "POST") {
    return res.status(401).send("Only POST requests are allowed");
  }

  const order = req.body;

  const {
    user: { email },
  } = await unstable_getServerSession(req, res, NextOptions);

  const client = await connectToDataBase();

  const orders = await client
    .db(process.env.DB)
    .collection(process.env.COLLECTION)
    .findOne({ email });

  const orderNumber = orders?.orders?.length + 1;

  await client
    .db(process.env.DB)
    .collection(process.env.COLLECTION)
    .updateOne({ email }, { $push: { orders: { ...order, orderNumber } } });

  client.close();

  res.status(200).json({ message: "ok", order, ok: true });
}
