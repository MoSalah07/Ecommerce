import { connectToDataBase } from "../../../../lib/auth/conectDB";
import { unstable_getServerSession } from "next-auth/next";
import { NextOptions } from "../../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handlerAdminProduct(req, res) {
  if (req.method === "POST") {
    // ObjectId from mongodb
    const objectId = ObjectId();
    const converIdToString = objectId.toString();
    // here add new property image and insert object from mongodb
    const data = {
      ...req.body,
      image: { id: converIdToString },
    };
    // Function Add To MongoDB
    await addProduct(data);
    return res.status(201).send(data);
  }

  if (req.method === "GET") {

    if (Object.values(req.query).length === 0 || !req.query) {
      const products = await getProducts();
      return res.status(200).send(products);
    }
    const product = await getSingleProduct(req.query.id);
    return res.status(200).send(product);
  }

  if (req.method === "DELETE") {
    if (!req.query) return res.status(500).send("Product not found");
    const id = req.query.id;
    // console.log(id);
    const product = await deleteProduct(id);
    return res.status(200).send(product);
  }

  if (req.method === "PUT") {
    if (
      Object.values(req.query).length === 0 ||
      !req.query ||
      Object.values(req.body).length === 0
    ) {
      return res.status(400).send("Bad Request");
    }

    const productId = req.query.id;
    const newProduct = req.body;
    const updatedProduct = await updateProduct(productId, newProduct);
    // console.log(updatedProduct);
    return res.status(200).send("updated product");
  }
}

const addProduct = async (data) => {
  const client = await connectToDataBase();
  const productDB = client.db(process.env.DB);
  const productsCollection = await productDB
    .collection(process.env.COLLECTIONPRO)
    .insertOne(data);
  client.close();
  return productsCollection;
};

const getProducts = async () => {
  const client = await connectToDataBase();
  const db = client.db(process.env.DB);
  const productsCollection = await db
    .collection(process.env.COLLECTIONPRO)
    .find()
    .toArray();
  client.close();
  return productsCollection;
};

const deleteProduct = async (id) => {
  const client = await connectToDataBase();
  const product = await client
    .db(process.env.DB)
    .collection(process.env.COLLECTIONPRO)
    .deleteOne({ _id: ObjectId(id) });
  client.close();
  return product;
};

const getSingleProduct = async (id) => {
  const client = await connectToDataBase();
  const product = await client
    .db(process.env.DB)
    .collection(process.env.COLLECTIONPRO)
    .findOne({
      _id: ObjectId(id),
    });
  return product;
};

const updateProduct = async (id, data) => {
  const client = await connectToDataBase();
  const productDb = client.db(process.env.DB);
  const dataWithoutId = Object.entries(data).filter(
    (item) => item[0] !== "_id"
  );
  const item = Object.fromEntries(dataWithoutId);
  const product = await productDb.collection("products").updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        ...item,
      },
    }
  );
  // client.close();

  return product;
};
