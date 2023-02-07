import { unstable_getServerSession } from "next-auth";
import { NextOptions } from "../auth/[...nextauth]";
import { connectToDataBase } from "../../../lib/auth/conectDB";

export default async function removeWishListHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(422).json({ message: "Wrong request" });
  }
  const item = req.body;
  const { id: idItem } = item;
  const {
    user: { email },
  } = await unstable_getServerSession(req, res, NextOptions);

  const client = await connectToDataBase();
  const user = await client
    .db("ecommerce")
    .collection("user")
    .findOne({ email });

  if (!user) {
    client.close();
    res.status(422).json({ message: "User not found" });
    return;
  }

  // Here In MongoDB => 'wishListProducts' => تقدر تكتبها  اكنها استرينج  وتقدر تكبتها من غير الاسترينج اهم حاجه التسميه وتكون موجوده فعلا
  await client
    .db("ecommerce")
    .collection("user")
    .updateOne({ email }, { $pull: { wishListProducts: { id: idItem } } });

  client.close();
  return res.status(200).json({ message: "Good" });
}
