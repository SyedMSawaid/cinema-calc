import { Expense } from "../models/expense";
import { Input } from ".";
import { ChangeEvent, FocusEvent, useState } from "react";

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export const ExpenseRow = ({ expense: expenseProp, onDelete }: Props) => {
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
    if (value !== initialValues[name as keyof Expense]) {
      console.log(`Field ${name} changed. Triggering save/validation.`);

      setInitialValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="flex gap-x-8">
        <div className="flex gap-x-8">
          <Input
            type="text"
            name="name"
            className="w-1/4"
            value={expense.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="number"
            name="percentageMarkup"
            className="w-1/4"
            value={expense.percentageMarkup}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="number"
            name="price"
            className="w-1/4"
            value={expense.price}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="w-1/4">{expense.totalPrice}</div>
        </div>
        <div
          className="bg-red-500 rounded-full px-1.5"
          onClick={() => onDelete(expense.id)}
        >
          X
        </div>
      </div>
    </>
  );
};
