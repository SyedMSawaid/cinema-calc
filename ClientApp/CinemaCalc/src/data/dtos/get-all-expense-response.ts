import Decimal from "decimal.js";
import { Expense } from "../models";

export class GetAllExpensesResponse {
  public total: Decimal;
  constructor(public expenses: Expense[]) {
    this.total = expenses.reduce(
      (prev, curr) => prev.add(curr.total),
      new Decimal(0)
    );
  }
}
