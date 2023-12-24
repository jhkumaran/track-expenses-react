import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    status: {
        isLoading: false,
        isSuccess: false,
        isFailure: false,
    }
};

const status = {
    isLoading: false,
    isSuccess: false,
    isFailure: false,
}

const loadingStatus = { ...status, isLoading: true};
const successStatus = { ...status, isSuccess: true};
const failureStatus = { ...status, isFailure: true};

const slice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getCategories: (state) => {
            return {
                ...state,
                categories: [],
                status: loadingStatus,
            }
        },
        getCategoriesSuccess: (state, action) => {
            let categories = [...action.payload];
            categories.map((category) => {
                category.value = category.id;
            });
            return {
                ...state,
                categories: categories,
                status: successStatus,
            }
        },
        getCategoriesFailure: (state) => {
            return {
                ...state,
                categories: [],
                status: failureStatus,
            }
        },
        addCategory: (state) => {
            return {
                ...state,
                status: loadingStatus,
            }
        },
        addCategorySuccess: (state, action) => {
            let newCategory = action.payload;
            newCategory.value = newCategory.id;
            return {
                ...state,
                categories: [...state.categories, newCategory],
                status: successStatus,
            }
        },
        addCategoryFailure: (state) => {
            return {
                ...state,
                status: failureStatus,
            }
        },
        updateCategory: (state) => {
            return {
                ...state,
                status: loadingStatus,
            }
        },
        updateCategorySuccess: (state, action) => {
            let newCategory = action.payload;
            newCategory.value = newCategory.id;
            let newCategories = [...state.categories];
            let index = newCategories.findIndex(t=> t.id === newCategory.id);
            newCategories[index] = newCategory;
            return {
                ...state,
                categories: newCategories,
                status: successStatus,
            }
        },
        updateCategoryFailure: (state) => {
            return {
                ...state,
                status: failureStatus,
            }
        },
        deleteCategory: (state) => {
            return {
                ...state,
                status: loadingStatus,
            }
        },
        deleteCategorySuccess: (state, action) => {
            let newCategories = [...state.categories];
            let index = newCategories.findIndex(t=> t.value === action.payload.value);
            newCategories.splice(index, 1);
            return {
                ...state,
                categories: newCategories,
                status: successStatus,
            }
        },
        deleteCategoryFailure: (state) => {
            return {
                ...state,
                status: failureStatus,
            }
        },
    }
});

export const { actions: CategoriesActions, reducer: CategoriesReducer } = slice;