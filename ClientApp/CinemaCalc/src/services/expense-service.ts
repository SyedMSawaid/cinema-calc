import httpClient from "../infra/http-client";
import { Expense } from "../models";

export const ExpenseService = {
  getAll: () => httpClient.get<Expense[]>("/Expense"),
  getById: (id: number) => httpClient.get<Expense>(`/Expense/${id}`),
  create: (data: Expense) => httpClient.post<Expense>("/Expense", data),
  delete: (id: number) => httpClient.delete<Expense>(`/Expense/${id}`),
  update: (data: Expense) =>
    httpClient.put<Expense>(`/Expense/${data.id}`, data),
};
