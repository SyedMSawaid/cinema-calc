import { GetAllExpensesResponse } from "../data/dtos";
import { Expense } from "../data/models";
import { httpClient } from "../infra";

export const ExpenseService = {
  getAll: () => httpClient.get<GetAllExpensesResponse>("/Expenses"),
  getById: (id: number) => httpClient.get<Expense>(`/Expenses/${id}`),
  create: (data: Expense) => httpClient.post<Expense>("/Expenses", data),
  delete: (id: number) => httpClient.delete<Expense>(`/Expenses/${id}`),
  update: (data: Expense) =>
    httpClient.put<Expense>(`/Expenses/${data.id}`, data),
};
