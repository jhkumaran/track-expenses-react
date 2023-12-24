import { all } from "redux-saga/effects";
import CategoriesSaga from "../slices/categoriesSlice/saga";
import ExpensesSaga from "../slices/expensesSlice/saga";

export default function* rootSaga() {
    const allSagas = [CategoriesSaga(), ExpensesSaga()];
    yield all(allSagas);
}