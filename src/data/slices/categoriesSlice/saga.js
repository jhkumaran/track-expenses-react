import { call, put, takeLatest } from 'redux-saga/effects';
import { CategoriesActions } from '.';
import * as api from './api';

export function* getCategories() {
    try{
        const { data } = yield call(api.getCategories);
        yield put(CategoriesActions.getCategoriesSuccess(data));
    } catch(e) {
        yield put(CategoriesActions.getCategoriesFailure());
    }
}

export function* addCategory(action) {
    try {
        let category = {
            label: action.payload
        }
        const { data } = yield call(api.addCategory, category);
        yield put(CategoriesActions.addCategorySuccess(data));
    } catch(e) {
        console.log(e);
        yield put(CategoriesActions.addCategoryFailure());
    }
}

export function* updateCategory(action) {
    try{
        let category = {
            label: action.payload.categoryName
        }
        let categoryId = action.payload.category.id;
        const { data } = yield call(api.updateCategory, categoryId, category);
        yield put(CategoriesActions.updateCategorySuccess(data));
    } catch(e) {
        console.log(e);
        yield put(CategoriesActions.updateCategoryFailure());
    }
}

export function* deleteCategory(action) {
    try{
        yield call(api.deleteCategory, action.payload);
        yield put(CategoriesActions.deleteCategorySuccess(action.payload));
    } catch(e) {
        console.log(e);
        yield put(CategoriesActions.deleteCategoryFailure());
    }
}

export default function* CategoriesSaga() {
    yield takeLatest(CategoriesActions.getCategories.type, getCategories);
    yield takeLatest(CategoriesActions.addCategory.type, addCategory);
    yield takeLatest(CategoriesActions.updateCategory.type, updateCategory);
    yield takeLatest(CategoriesActions.deleteCategory.type, deleteCategory);
}