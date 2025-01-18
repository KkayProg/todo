import './styles/style.css';
import './styles/media.css';
import { useSelector, useDispatch } from 'react-redux';
import { TodoItem } from "./TodoItem";
import { filterTodos } from '../store/todoSlice';

export const TodoList = () => {
    const { todos, filter } = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const filteredTodos = () => {
        if (filter === 'done') {
            return todos.filter(todo => todo.completed);
        }
        if (filter === 'no-done') {
            return todos.filter(todo => !todo.completed);
        }
        return todos;
    };

    const hasDone = todos.some(todo => todo.completed);
    const hasNotDone = todos.some(todo => !todo.completed);
    const hasTodos = todos.length > 0;

    const handleFilter = (filterValue) => {
        dispatch(filterTodos({ filter: filterValue }));
    };

    return (
        <div>
            <div className="filter-buttons">
                <button 
                    className='filter-buttons__all' 
                    onClick={() => handleFilter('all')} 
                    disabled={!hasTodos}
                >
                    Все
                </button>
                <button 
                    className='filter-buttons__done' 
                    onClick={() => handleFilter('done')} 
                    disabled={!hasDone}
                >
                    Выполнено
                </button>
                <button 
                    className='filter-buttons__no-done' 
                    onClick={() => handleFilter('no-done')} 
                    disabled={!hasNotDone}
                >
                    Не выполнено
                </button>
            </div>
            <ul className="todo-list">
                {filteredTodos().map((todo) => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
            </ul>
        </div>
    );
};
