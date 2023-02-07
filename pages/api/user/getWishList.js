import { unstable_getServerSession } from "next-auth";
import { NextOptions } from "../auth/[...nextauth]";
import { connectToDataBase } from "../../../lib/auth/conectDB";

export default async function handlerGetWishList(req, res) {
  if (req.method !== "GET") {
      res.status( 422 ).json( { message: 'request method not supported' } );
  }
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
    return res.status(422).json({ message: "User not found" });
  }
  client.close();
  return res.status(200).json({ message: "Good", wishList: user.wishListProducts });
}
