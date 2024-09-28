import Decimal from "decimal.js";

export type Expense = {
  id: number;
  name: string;
  price: Decimal;
  percentageMarkup: Decimal;
  total: Decimal;
};
