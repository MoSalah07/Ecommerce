import { unstable_getServerSession } from "next-auth";
import { NextOptions } from "../auth/[...nextauth]";
import { connectToDataBase } from "../../../lib/auth/conectDB";
import { hashPassword, vefiyPassword } from "../../../lib/auth/handelPassword";

export default async function handlerChangePassword(req, res) {
  if (req.method !== "POST") return;

  const { currentPassword, newPassword } = req.body;

  const {
    user: { email },
  } = await unstable_getServerSession(req, res, NextOptions);

  const client = await connectToDataBase();

  const db = client.db("ecommerce");

  const user = await db.collection("user").findOne({ email });

  if (!user) {
    client.close();
    return res.status(200).json({ message: "Not Authorized" });
  }

  const { password: currentPasswordFromDb } = user;

  const isPasswordTrue = await vefiyPassword(
    currentPassword,
    currentPasswordFromDb
  );

  if (!isPasswordTrue) {
    client.close();
    res.status(200).json({ message: "invalid password" });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await db.collection("user").updateOne(
    { email: email },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  return res.status(200).json({ message: "Password changed successfully" });
}
