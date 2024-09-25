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
      <div className="flex gap-x-8">
        <Input
          type="text"
          name="name"
          label="Name"
          className="w-1/4"
          value={expense.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          id="percentageMarkup"
          type="number"
          name="percentageMarkup"
          label="Markup"
          className="w-1/4"
          value={expense.percentageMarkup}
          onChange={handleChange}
          onBlur={handleBlur}
          unit="%"
        />
        <Input
          id="price"
          type="number"
          name="price"
          label="Price"
          className="w-1/4"
          value={expense.price}
          onChange={handleChange}
          onBlur={handleBlur}
          unit="€"
        />

        <div className="w-1/4 text-right">{expense.total} €</div>

        <div
          className="bg-red-500 rounded-full px-1.5 w-6"
          onClick={() => onDelete(expense.id)}
        >
          X
        </div>
      </div>
    </>
  );
};
