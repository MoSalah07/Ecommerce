import { unstable_getServerSession } from "next-auth";
import { NextOptions } from "../auth/[...nextauth]";
import { connectToDataBase } from "../../../lib/auth/conectDB";

export default async function handlerAddWishList(req, res) {

  if (req.method === "POST") {
    const {
      user: { email },
    } = await unstable_getServerSession(req, res, NextOptions);
    const item = { ...req.body };

    const client = await connectToDataBase();
    const user = await client
      .db("ecommerce")
      .collection("user")
      .findOne({ email });

    if (!user) {
      client.close();
      return res.status(422).json({ message: "User not found" });
      }
      

    const result = await client
      .db("ecommerce")
      .collection("user")
          .updateOne( { email }, { $addToSet: { wishListProducts: { $each: [item] } } } );
    client.close();
    return res.status(200).json({ message: "Success", result });
  }
}
