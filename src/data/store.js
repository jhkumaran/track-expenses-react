import  { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { CategoriesReducer } from './slices/categoriesSlice';
import { ExpensesReducer } from './slices/expensesSlice';
import rootSaga from './sagas';

export default function configureAppStore() {
    const logger = createLogger();
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, logger];
    const store = configureStore({
        reducer: {
            CategoriesReducer,
            ExpensesReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    });
    sagaMiddleware.run(rootSaga);
    return store;
};