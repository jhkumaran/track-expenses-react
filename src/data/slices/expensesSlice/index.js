import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    status: {
        isLoading: false,
        isSuccess: false,
        isFailure: false,
    }
}

const status = {
    isLoading: false,
    isSuccess: false,
    isFailure: false,
}

const loadingStatus = { ...status, isLoading: true};
const successStatus = { ...status, isSuccess: true};
const failureStatus = { ...status, isFailure: true};

const slice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        getExpenses: (state) => {
            return {
                ...state,
                expenses: [],
                status: loadingStatus,
            }
        },
        getExpensesSuccess: (state, action) => {
            let newExpenses = [...action.payload];
            newExpenses = newExpenses.sort((a,b) => a.date < b.date ? -1 : 1);
            return {
                ...state,
                expenses: newExpenses,
                status: successStatus,
            }
        },
        getExpensesFailure: (state) => {
            return {
                ...state,
                expenses: [],
                status: failureStatus,
            }
        },
        addExpense: (state) => {
            return {
                ...state,
                status: loadingStatus,
            }
        },
        addExpenseSuccess: (state, action) => {
            let newExpenses = [...state.expenses, action.payload];
            newExpenses = newExpenses.sort((a,b) => a.date < b.date ? -1 : 1);
            return {
                ...state,
                expenses: newExpenses,
                status: successStatus,
            }
        },
        addExpenseFailure: (state) => {
            return {
                ...state,
                status: failureStatus,
            }
        },
        updateExpense: (state) => {
            return {
                ...state,
                status: loadingStatus,
            }
        },
        updateExpenseSuccess: (state, action) => {
            let newExpenses = [...state.expenses];
            let index = newExpenses.findIndex(t=> t.id === action.payload.id);
            newExpenses[index] = action.payload;
            newExpenses = newExpenses.sort((a,b) => a.date < b.date ? -1 : 1);
            return {
                ...state,
                expenses: newExpenses,
                status: successStatus,
            }
        },
        updateExpenseFailure: (state) => {
            return {
                ...state,
                status: failureStatus,
            }
        },
        deleteExpense: (state) => {
            return {
                ...state,
                status: loadingStatus,
            }
        },
        deleteExpenseSuccess: (state, action) => {
            let newExpenses = [...state.expenses];
            let index = newExpenses.findIndex(t=> t.id === action.payload);
            newExpenses.splice(index, 1);
            return {
                ...state,
                expenses: newExpenses,
                status: successStatus,
            }
        },
        deleteExpenseFailure: (state) => {
            return {
                ...state,
                status: failureStatus,
            }
        },
    }
});

export const { actions: ExpensesActions, reducer: ExpensesReducer } = slice;