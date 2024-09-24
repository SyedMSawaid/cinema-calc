import { useCallback, useEffect, useState } from "react";
import { Expense } from "../models";
import { Button, ExpenseRow } from "../components";
import httpClient from "../infra/http-client";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      name: "Hi",
      price: 900,
      percentageMarkup: 0.25,
      total: 899,
    },
  ]);

  const fetchData = useCallback(async () => {
    const expenses = await httpClient.get<Expense[]>("/Expense");
    setExpenses(expenses);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addExpense = async () => {
    const newExpense = {
      id: Date.now().toString(),
      name: `Expense ${expenses.length + 1}`,
      percentageMarkup: 0,
      price: 0,
      total: 0,
    } as Expense;

    setExpenses([...expenses, newExpense]);
    const expense = await httpClient.post<Expense>("/Expense", newExpense);
    const filtered = expenses.filter((x) => x.id !== newExpense.id);

    setExpenses([...filtered, expense]);
  };

  const updateExpense = async (data: Expense) => {
    const updatedExpensesList = expenses.map((x) =>
      x.id === data.id ? data : x
    );
    setExpenses(updatedExpensesList);

    await httpClient.put<Expense>(`Expense/${data.id}`, data);
  };

  const deleteExpense = async (id: string) => {
    const filtered = expenses.filter((x) => x.id !== id);
    setExpenses(filtered);
    await httpClient.delete(`/Expense/${id}`);
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
              <div></div>
            </div>
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
                onBlur={updateExpense}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
