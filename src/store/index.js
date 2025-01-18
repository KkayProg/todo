import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const saveToLocalStorage = (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem('todos', JSON.stringify(store.getState().todos.todos));
    return result;
};

const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveToLocalStorage),
});

export default store;