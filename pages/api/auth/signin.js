import { connectToDataBase } from "../../../lib/auth/conectDB";
import { hashPassword } from "../../../lib/auth/handelPassword";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6
    ) {
      res.status(202).json({
        message:
          "Invalid input - password should also be at least 6 characters long .",
      });
      return;
    }

    const client = await connectToDataBase();
    const db = client.db("ecommerce");

    const existUser = await db.collection("user").findOne({ email });

    if (existUser) {
      res.status(202).json({ message: "User already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const userCollection = await db.collection("user").insertOne({
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(200).json({ message: "OK", userCollection });
  }
}
