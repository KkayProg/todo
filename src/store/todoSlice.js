import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filter: 'all',
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todos = [{
                    id: Date.now(),
                    title: action.payload.title,
                    completed: false,
                },
                ...state.todos,
            ];
        },
        toggleCompleteTodo(state, action) {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            todo.completed = !todo.completed;
        },
        removeTodo(state, action) {
            if (window.confirm('Удалить задачу?')) {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
            }            
        },
        editTodoText(state, action) {
            const {
                id,
                title
            } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.title = title;
            }
        },
        filterTodos(state, action) {
            state.filter = action.payload.filter;
        },
    },
});

export const {
    addTodo,
    toggleCompleteTodo,
    removeTodo,
    editTodoText,
    filterTodos
} = todoSlice.actions;

export default todoSlice.reducer;