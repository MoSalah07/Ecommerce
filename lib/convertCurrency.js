import { Convert } from "easy-currencies";

const convertCurrency = async (amount, currency) => {
  if (currency?.split("")?.length > 3) return;

  const value = await Convert(amount).from("USD").to(currency);
  const price = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: currency,
  }).format(value);
  return price;
};

export default convertCurrency;
