import { call, put, takeLatest } from 'redux-saga/effects';
import { ExpensesActions } from '.';
import { mockExpenses } from '../../../utilities/mockData';
import * as api from './api';

export function* getExpenses(){
    try {
        const { data } = yield call(api.getExpenses);
        yield put(ExpensesActions.getExpensesSuccess(data));
    } catch(e) {
        console.log(e);
        yield put(ExpensesActions.getExpensesFailure());
    }
}

export function* addExpense(action) {
    try{
        const { data } = yield call(api.addExpense, action.payload);
        yield put(ExpensesActions.addExpenseSuccess(data));
    } catch(e) {
        console.log(e);
        yield put(ExpensesActions.addExpenseFailure());
    }
}

export function* deleteExpense(action) {
    try{
        yield call(api.deleteExpense, action.payload);
        yield put(ExpensesActions.deleteExpenseSuccess(action.payload));
    }catch(e) {
        console.log(e);
        yield(ExpensesActions.deleteExpenseFailure());
    }
}

export function* updateExpense(action) {
    try {
        const { data } = yield call(api.updateExpense, action.payload);
        yield put(ExpensesActions.updateExpenseSuccess(data));

    }catch(e) {
        console.log(e);
        yield(ExpensesActions.updateExpenseFailure());
    }
}

export default function* ExpensesSaga(){
    yield takeLatest(ExpensesActions.getExpenses.type, getExpenses);
    yield takeLatest(ExpensesActions.addExpense.type, addExpense);
    yield takeLatest(ExpensesActions.deleteExpense.type, deleteExpense);
    yield takeLatest(ExpensesActions.updateExpense.type, updateExpense);
}