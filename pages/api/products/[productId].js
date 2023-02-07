import data from "../../../data/Dummy_Data";

export default function handlerProductId(req, res) {
  if (req.method === "GET") {
    const id = Number(req.query.productId);
    const findCurrentElement = data.find((el) => el.id === id);
    return res.status(200).json(findCurrentElement);
  }
}
