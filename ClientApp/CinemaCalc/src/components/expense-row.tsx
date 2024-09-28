import { Expense } from "../models/expense";
import { Input } from ".";
import { ChangeEvent, FocusEvent, useState } from "react";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

      onBlur(expense);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-x-2 gap-y-2">
        <Input
          type="text"
          name="name"
          label="Name"
          containerClassName="col-span-5 sm:col-span-1"
          value={expense.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Input
          id="price"
          type="number"
          name="price"
          label="Price"
          containerClassName="col-span-2 sm:col-span-1"
          value={expense.price}
          onChange={handleChange}
          onBlur={handleBlur}
          unit="€"
        />

        <Input
          id="percentageMarkup"
          type="number"
          name="percentageMarkup"
          label="Markup"
          value={expense.percentageMarkup}
          onChange={handleChange}
          onBlur={handleBlur}
          unit="%"
        />

        <div className="flex flex-col items-center justify-around text-sm text-right sm:text-base">
          <label className="text-xs sm:hidden">Total</label>
          <div id="total">{expense.total} €</div>
        </div>

        <div className="flex items-center justify-center grow">
          <div
            className="bg-red-500 rounded-full px-1.5 h-6 w-6 items-center flex self-center justify-center"
            onClick={() => onDelete(expense.id)}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
};
