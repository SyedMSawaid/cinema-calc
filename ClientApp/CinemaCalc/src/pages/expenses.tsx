import { Expense } from "../models";
import { Button, ExpenseRow } from "../components";
import { ExpenseService } from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Expenses = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["expenses"],
    queryFn: ExpenseService.getAll,
  });

  const onErrorHandler = () => (_error, _expense, context) =>
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
      queryClient.setQueryData(["expenses"], (oldExpenses: Expense[]) => [
        ...(oldExpenses ?? []),
        newExpense,
      ]);
      return { previousExpenses };
    },
    onError: onErrorHandler,
    onSettled: onSettledHandler,
  });

  const updateMutation = useMutation({
    mutationFn: ExpenseService.update,
    onMutate: async (updatedExpense) => {
      const previousExpenses = await getPreviousExpenses();

      queryClient.setQueryData(["expenses"], (oldExpenses: Expense[]) =>
        oldExpenses?.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
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
      const previousExpenses = getPreviousExpenses();

      queryClient.setQueryData(["expenses"], (oldExpense: Expense[]) =>
        oldExpense?.filter((expense) => expense.id !== id)
      );

      return { previousExpenses };
    },
    onError: onErrorHandler,
    onSettled: onSettledHandler,
  });

  const addExpense = async () => {
    const expense = {
      id: Date.now(),
      name: `Expense ${(query?.data?.length ?? 0) + 1}`,
      percentageMarkup: 0,
      price: 0,
      total: 0,
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

          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between font-bold gap-x-8">
              <div className="w-1/4">Name</div>
              <div className="w-1/4">Price</div>
              <div className="w-1/4">Markup (%)</div>
              <div className="w-1/4">Total</div>
              <div className="w-6"></div>
              <div></div>
            </div>
            {query?.data?.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onDelete={(id) => deleteMutation.mutate(id)}
                onBlur={(data) => updateMutation.mutate(data)}
              />
            ))}
          </div>

          <div className="place-self-end">Total Value: 420</div>
        </div>
      </div>
    </>
  );
};
