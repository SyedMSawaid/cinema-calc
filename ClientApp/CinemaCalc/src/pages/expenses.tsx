import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Decimal from "decimal.js";
import { Button, ExpenseRow } from "../components";
import { GetAllExpensesResponse } from "../data/dtos";
import { Expense } from "../data/models";
import { ExpenseService } from "../services";
import { useEffect, useState } from "react";
import { cn } from "../helpers";

export const Expenses = () => {
  const queryClient = useQueryClient();
  const [animate, setAnimate] = useState(false);

  const query = useQuery({
    queryKey: ["expenses"],
    queryFn: ExpenseService.getAll,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onErrorHandler = (error, expense, context) =>
    queryClient.setQueryData(["expenses"], context?.previousExpenses);
  const onSettledHandler = () =>
    queryClient.invalidateQueries({ queryKey: ["expenses"] });

  const getPreviousExpenses = async () => {
    await queryClient.cancelQueries({ queryKey: ["expenses"] });
    return queryClient.getQueryData<GetAllExpensesResponse>(["expenses"]);
  };

  const shouldAnimate = (
    prev?: GetAllExpensesResponse,
    curr?: GetAllExpensesResponse
  ) => {
    if (prev?.total?.toString() !== curr?.total?.toString()) {
      setAnimate(true);
    }
  };

  const createMutation = useMutation({
    mutationFn: ExpenseService.create,
    onMutate: async (newExpense) => {
      const previousExpenses = await getPreviousExpenses();

      const response = queryClient.setQueryData(
        ["expenses"],
        (response: GetAllExpensesResponse) =>
          new GetAllExpensesResponse([...(response.expenses ?? []), newExpense])
      );

      shouldAnimate(previousExpenses, response as GetAllExpensesResponse);

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

      const response = queryClient.setQueryData(
        ["expenses"],
        (response: GetAllExpensesResponse) =>
          new GetAllExpensesResponse(
            response.expenses?.map((expense: Expense) =>
              expense.id === updatedExpense.id ? updatedExpense : expense
            )
          )
      );

      shouldAnimate(previousExpenses, response as GetAllExpensesResponse);

      return { previousExpenses };
    },
    onError: onErrorHandler,
    onSettled: onSettledHandler,
  });

  const deleteMutation = useMutation({
    mutationFn: ExpenseService.delete,
    onMutate: async (id) => {
      const previousExpenses = await getPreviousExpenses();

      const response = queryClient.setQueryData(
        ["expenses"],
        (response: GetAllExpensesResponse) =>
          new GetAllExpensesResponse(
            response.expenses?.filter((expense: Expense) => expense.id !== id)
          )
      );

      shouldAnimate(previousExpenses, response as GetAllExpensesResponse);

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

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col max-w-screen-lg py-10 gap-y-12 grow">
          <div className="px-2 pb-56 bg-white shadow-2xl md:px-10 rounded-xl">
            <div className="flex flex-col items-center justify-center py-16 gap-y-4">
              <h1 className="text-2xl font-bold text-center">Cinema Calc</h1>

              <Button onClick={addExpense}>Add new Point</Button>
            </div>

            <div className="flex flex-col py-10 border-gray-200 border-dashed gap-y-4 border-y">
              {!query?.data?.expenses?.length ? (
                <div className="text-sm text-center text-gray-400 md:text-base">
                  No points added yet! Click on the top button to add some.
                </div>
              ) : (
                <>
                  <div className="hidden grid-cols-6 gap-4 sm:grid">
                    <div className="col-span-2 text-center">Name</div>
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
                </>
              )}
            </div>

            <div className="flex items-center justify-center py-10 text-sm sm:text-base gap-x-4">
              <div className="text-6xl text-bold">&Sigma;</div>
              <div
                className={cn(
                  "text-3xl",
                  animate && "animate__animated animate__pulse animate__faster"
                )}
              >
                {query?.data?.total?.toFixed(2)} €
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
