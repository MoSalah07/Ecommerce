import { sortProducts } from "./sortProduct";
function filterProducts(list, query) {
  let { category, colors, brand, price, search, sort, limited } = query;

  let [min, max] = price || "";

  if (price) {
    [min, max] = price.split("-");
  }

  const colorsList = colors.split(",");


  // console.log(!category, !brand, !price, !search, !limited)

  const limitedNumber = Number(limited);

  const productsList = list
    .filter((product) => {
      return (
        (!category
          ? list
          : product.category.toLowerCase() === category.toLowerCase()) &&
        (colorsList[0] === ""
          ? list
          : colorsList.some((el) => el === product.color)) &&
        (!brand ? list : product.brand.toLowerCase() === brand.toLowerCase()) &&
        (!price
          ? list
          : Number(product.price) >= Number(min) &&
            Number(product.price) <= Number(max)) &&
        (!search
          ? list
          : product.title.toLowerCase().includes(search.toLowerCase()))
      );
    })
    // .slice(0, limitedNumber)
    .sort((a, b) => sortProducts(a, b, sort));

  return productsList;
}

export default filterProducts;
