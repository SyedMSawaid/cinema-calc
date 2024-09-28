import { Expense } from "../data/models";
import { Button, ExpenseRow } from "../components";
import { ExpenseService } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllExpensesResponse } from "../data/dtos";
import Decimal from "decimal.js";

export const Expenses = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["expenses"],
    queryFn: ExpenseService.getAll,
  });

  const onErrorHandler = (error, expense, context) =>
    queryClient.setQueryData(["expenses"], context?.previousExpenses);
  const onSettledHandler = () =>
    queryClient.invalidateQueries({ queryKey: ["expenses"] });

  const getPreviousExpenses = async () => {
    await queryClient.cancelQueries({ queryKey: ["expenses"] });
    return queryClient.getQueryData<Expense[]>(["expenses"]);
  };

  const createMutation = useMutation({
    mutationFn: ExpenseService.create,
    onMutate: async (newExpense) => {
      const previousExpenses = await getPreviousExpenses();
      queryClient.setQueryData(
        ["expenses"],
        (response: GetAllExpensesResponse) =>
          new GetAllExpensesResponse([...(response.expenses ?? []), newExpense])
      );
      return { previousExpenses };
    },
    onError: onErrorHandler,
    onSettled: onSettledHandler,
  });

  const updateMutation = useMutation({
    mutationFn: ExpenseService.update,
    onMutate: async (updatedExpense) => {
      const previousExpenses = await getPreviousExpenses();

      updatedExpense.total = updatedExpense.percentageMarkup
        .dividedBy(100)
        .times(updatedExpense.price)
        .add(updatedExpense.price);

      queryClient.setQueryData(
        ["expenses"],
        (response: GetAllExpensesResponse) =>
          new GetAllExpensesResponse(
            response.expenses?.map((expense: Expense) =>
              expense.id === updatedExpense.id ? updatedExpense : expense
            )
          )
      );

      return { previousExpenses };
    },
    onError: onErrorHandler,
    onSettled: onSettledHandler,
  });

  const deleteMutation = useMutation({
    mutationFn: ExpenseService.delete,
    onMutate: async (id) => {
      const previousExpenses = await getPreviousExpenses();

      queryClient.setQueryData(
        ["expenses"],
        (response: GetAllExpensesResponse) =>
          new GetAllExpensesResponse(
            response.expenses?.filter((expense: Expense) => expense.id !== id)
          )
      );

      return { previousExpenses };
    },
    onError: onErrorHandler,
    onSettled: onSettledHandler,
  });

  const addExpense = async () => {
    const expense = {
      id: Date.now(),
      name: `Expense ${(query?.data?.expenses?.length ?? 0) + 1}`,
      percentageMarkup: new Decimal(0),
      price: new Decimal(0),
      total: new Decimal(0),
    } as Expense;

    createMutation.mutate(expense);
  };

  // TODO: Handle loading data and when screen is empty

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col py-10 gap-y-12">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <h1 className="text-2xl font-bold text-center">Cinema Calc</h1>

            <Button onClick={addExpense}>Add new Point</Button>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="hidden grid-cols-5 gap-4 sm:grid">
              <div className="text-center">Name</div>
              <div className="text-center">Price</div>
              <div className="text-center">Markup</div>
              <div className="text-center">Total</div>
              <div className=""></div>
            </div>
            {query?.data?.expenses?.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onDelete={(id) => deleteMutation.mutate(id)}
                onBlur={(data) => updateMutation.mutate(data)}
              />
            ))}
          </div>

          <div className="text-sm place-self-end sm:text-base">
            Grand Total: {query?.data?.total?.toFixed(2)} €
          </div>
        </div>
      </div>
    </>
  );
};
