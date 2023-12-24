import axios from 'axios';
import { endpoints } from '../../../utilities/endpoints';

export const getExpenses = () => {
    return axios.get(endpoints.expenses);
}

export const getExpensesByMonth = (billingMonth) => {
    return axios.get(`${endpoints.expensesByMonth}/${billingMonth}`);
}

export const addExpense = (expense) => {
    return axios.post(endpoints.expenses, expense);
}

export const deleteExpense = (expenseId) => {
    return axios.delete(`${endpoints.expenses}/${expenseId}`);
}

export const updateExpense = (expense) => {
    return axios.put(`${endpoints.expenses}/${expense.id}`, expense);
}