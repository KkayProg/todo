import './styles/style.css';
import './styles/media.css';
import { useDispatch } from 'react-redux';
import { editTodoText, removeTodo, toggleCompleteTodo } from '../store/todoSlice';
import { useEffect, useRef, useState } from 'react';

export const TodoItem = ({ title, id, completed }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const inputRef = useRef(null);
    const [error, setError] = useState('');
    const [isSaveActive, setIsSaveActive] = useState(false);

    const validateEditing = () => {
        if (newTitle.trim() === '') {
            setError('Задача не может быть пустой');
            return false;
        }
        setError('');
        return true;
    };

    const handleEdit = () => {
        if (!validateEditing()) return;
        dispatch(editTodoText({ id, title: newTitle }));
        setIsEditing(false);
        setIsSaveActive(false); 
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleChange = (e) => {
        setNewTitle(e.target.value);
        setError('');
        if (e.target.value.trim() !== title.trim()) {
            setIsSaveActive(true);
        } else {
            setIsSaveActive(false);
        }
    };

    return (
        <li className="todo-list__item">
            <span className="todo-list__day">Сегодня</span>
            <div className="todo-list__content">
                <input
                    className="todo-list__checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={() => dispatch(toggleCompleteTodo({ id }))}
                />
                {isEditing ? (
                    <input
                        ref={inputRef}
                        className={`todo-list__input-edit ${error ? 'todo-list__input-error' : ''}`}
                        value={newTitle}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleEdit()} 
                        onBlur={handleEdit} 
                    />
                ) : (
                    <span className="todo-list__text">{title}</span>
                )}
            </div>
            {error && <p className="todo-list__error">{error}</p>}
            <div className="todo-list__controls">
                {isEditing && (
                    <span
                        className={`todo-list__save ${isSaveActive ? 'active' : ''}`}
                        onClick={handleEdit}
                    >
                        Сохранить
                    </span>
                )}
                <span
                    className={`todo-list__edit ${isEditing ? 'active' : ''}`}
                    onClick={() => setIsEditing(true)}
                >
                    <svg tabIndex="0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#30324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.375 2.62498C18.7728 2.22716 19.3124 2.00366 19.875 2.00366C20.4376 2.00366 20.9771 2.22716 21.375 2.62498C21.7728 3.02281 21.9963 3.56237 21.9963 4.12498C21.9963 4.68759 21.7728 5.22716 21.375 5.62498L12.362 14.639C12.1245 14.8762 11.8312 15.0499 11.509 15.144L8.63597 15.984C8.54992 16.0091 8.45871 16.0106 8.37188 15.9883C8.28505 15.9661 8.2058 15.9209 8.14242 15.8575C8.07904 15.7942 8.03386 15.7149 8.01162 15.6281C7.98937 15.5412 7.99087 15.45 8.01597 15.364L8.85597 12.491C8.9505 12.169 9.12451 11.876 9.36197 11.639L18.375 2.62498Z" stroke="#30324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span className="todo-list__remove" onClick={() => dispatch(removeTodo({ id }))}>
                    <svg tabIndex="0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V6H21C21.2652 6 21.5196 6.10536 21.7071 6.29289C21.8946 6.48043 22 6.73478 22 7C22 7.26522 21.8946 7.51957 21.7071 7.70711C21.5196 7.89464 21.2652 8 21 8H19.931L19.064 20.142C19.0281 20.6466 18.8023 21.1188 18.4321 21.4636C18.0619 21.8083 17.5749 22 17.069 22H6.93C6.42414 22 5.93707 21.8083 5.56688 21.4636C5.1967 21.1188 4.97092 20.6466 4.935 20.142L4.07 8H3C2.73478 8 2.48043 7.89464 2.29289 7.70711C2.10536 7.51957 2 7.26522 2 7C2 6.73478 2.10536 6.48043 2.29289 6.29289C2.48043 6.10536 2.73478 6 3 6H7V4ZM9 6H15V4H9V6ZM6.074 8L6.931 20H17.07L17.927 8H6.074ZM10 10C10.2652 10 10.5196 10.1054 10.7071 10.2929C10.8946 10.4804 11 10.7348 11 11V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V11C9 10.7348 9.10536 10.4804 9.29289 10.2929C9.48043 10.1054 9.73478 10 10 10ZM14 10C14.2652 10 14.5196 10.1054 14.7071 10.2929C14.8946 10.4804 15 10.7348 15 11V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V11C13 10.7348 13.1054 10.4804 13.2929 10.2929C13.4804 10.1054 13.7348 10 14 10Z" fill="#FF2F2F" />
                    </svg>
                </span>
            </div>
        </li>
    );
};
