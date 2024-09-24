import { useState } from "react";
import { Expense } from "../models";
import { Button, ExpenseRow } from "../components";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      name: "Hi",
      price: 900,
      percentageMarkup: 0.25,
      totalPrice: 899,
    },
  ]);

  const addExpense = () => {
    const newExpense = {
      id: Date.now().toString(),
      name: `Expense ${expenses.length + 1}`,
      percentageMarkup: 0,
      price: 0,
      totalPrice: 0,
    } as Expense;

    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    const filtered = expenses.filter((x) => x.id !== id);
    setExpenses(filtered);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col py-10 gap-y-12">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <h1 className="text-2xl font-bold text-center">Cinema Calc</h1>

            <Button onClick={addExpense}>Add new Point</Button>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between font-bold gap-x-8">
              <div className="w-1/4">Name</div>
              <div className="w-1/4">Price</div>
              <div className="w-1/4">Markup (%)</div>
              <div className="w-1/4">Total</div>
            </div>
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
