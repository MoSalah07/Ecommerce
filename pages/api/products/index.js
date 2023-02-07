import data from "../../../data/Dummy_Data";
import filterProducts from "../../../lib/filterProductAPI";

export default async function handler(req, res) {
  const query = Object.entries(req.query).flat();
  const pageLimit = Number(req.query["limited"]) || 10;
  const page = Number(req.query.page);
  // console.log(pageLimit)
  //   console.log(page);
  if (req.method === "GET" && query.length === 0) {
    res.status(200).json(data);
  }

  if (req.method === "GET" && query.length !== 0) {
    // const { category } = req.query;

    let filterData = await filterProducts( data, req.query );
    


    const pagination = {
      pageCount: Math.ceil(data.length / pageLimit),
      currentPage: page || 1,
      nextPage:
        Math.floor(filterData.length / page / pageLimit) === 0
          ? "No Pages"
          : page + 1,
      prevPage: page - 1 === 0 ? 1 : page - 1,
      isLastPage: Math.floor(filterData.length / page / pageLimit) === 0,
    };

    filterData = filterData.slice(
      (pagination.currentPage - 1) * pageLimit > filterData.length
        ? 0
        : (pagination.currentPage - 1) * pageLimit,
      pageLimit * pagination.currentPage
    );
    // console.log(filterData)
    // console.log(pagination)
    return res.status(200).json({ filterData, pagination });
    // return res.status(200).json(filterData);
  }
}
