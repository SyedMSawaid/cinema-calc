import Decimal from "decimal.js";
import { TrashIcon } from "lucide-react";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { Input } from ".";
import { Expense } from "../data/models";
import { isValidNumber } from "../helpers";

interface Props {
  expense: Expense;
  onDelete: (id: number) => void;
  onBlur: (data: Expense) => void;
}

export const ExpenseRow = ({
  expense: expenseProp,
  onDelete,
  onBlur,
}: Props) => {
  const [expense, setExpense] = useState(expenseProp);
  const [initialValues, setInitialValues] = useState(expenseProp);

  useEffect(() => {
    setExpense(expenseProp);
  }, [expenseProp]);

  const isDecimalField = (name: string) =>
    ["price", "percentageMarkup"].includes(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isDecimalField(name) && !isValidNumber(value)) return;

    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value != initialValues[name as keyof Expense]) {
      setInitialValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      onBlur({
        ...expense,
        price: new Decimal(expense.price.toString().trim() || "0"),
        percentageMarkup: new Decimal(
          expense.percentageMarkup.toString().trim() || "0"
        ),
      });
    }
  };

  return (
    <div className="grid grid-cols-4 p-4 border-2 sm:grid-cols-6 rounded-xl bg-amber-50 border-amber-100 gap-x-2 gap-y-2">
      <Input
        id={`expense-name-${expense.id}`}
        type="text"
        name="name"
        label="Name"
        containerClassName="col-span-4 sm:col-span-2"
        value={expense.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Input
        id={`expense-price-${expense.id}`}
        type="number"
        name="price"
        label="Price"
        containerClassName="col-span-1 sm:col-span-1"
        value={expense.price?.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0"
        unit="€"
      />

      <Input
        id={`expense-percentageMarkup-${expense.id}`}
        type="number"
        name="percentageMarkup"
        label="Markup"
        value={expense.percentageMarkup?.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0"
        unit="%"
      />

      <div className="flex flex-col items-end justify-around text-sm text-right sm:text-base">
        <label
          className="text-xs sm:hidden"
          htmlFor={`expense-total-${expense.id}`}
        >
          Total
        </label>
        <div id={`expense-total-${expense.id}`}>
          {expense.total?.toFixed(2)} €
        </div>
      </div>

      <div className="flex items-center justify-center grow">
        <div
          className="border-2 border-red-500 hover:bg-red-500 rounded-full px-1.5 h-6 w-6 items-center flex self-center justify-center"
          onClick={() => onDelete(expense.id)}
        >
          <TrashIcon className="text-2xl font-bold text-red-500 hover:text-white" />
        </div>
      </div>
    </div>
  );
};
