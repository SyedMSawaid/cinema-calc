import { GetAllExpensesResponse } from "../data/dtos";
import { Expense } from "../data/models";
import { httpClient } from "../infra";

export const ExpenseService = {
  getAll: () => httpClient.get<GetAllExpensesResponse>("/Expense"),
  getById: (id: number) => httpClient.get<Expense>(`/Expense/${id}`),
  create: (data: Expense) => httpClient.post<Expense>("/Expense", data),
  delete: (id: number) => httpClient.delete<Expense>(`/Expense/${id}`),
  update: (data: Expense) =>
    httpClient.put<Expense>(`/Expense/${data.id}`, data),
};
