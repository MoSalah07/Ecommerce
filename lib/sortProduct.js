export const sortProducts = (a, b, type) => {
    if (type === "price") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (type === "rate") {
      return a.rating.rate - b.rating.rate;
    } else {
      return a.id - b.id;
    }
  };
  