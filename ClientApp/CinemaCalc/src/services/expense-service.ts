import { httpClient } from "../infra";
import { Expense } from "../data/models";
import { GetAllExpensesResponse } from "../data/dtos";

export const ExpenseService = {
  getAll: () => httpClient.get<GetAllExpensesResponse>("/Expense"),
  getById: (id: number) => httpClient.get<Expense>(`/Expense/${id}`),
  create: (data: Expense) => httpClient.post<Expense>("/Expense", data),
  delete: (id: number) => httpClient.delete<Expense>(`/Expense/${id}`),
  update: (data: Expense) =>
    httpClient.put<Expense>(`/Expense/${data.id}`, data),
};
