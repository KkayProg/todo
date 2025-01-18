import { useState } from 'react';
import './styles/style.css';
import './styles/media.css';

export const TodoForm = ({ title, handleSubmit, handleInput }) => {
    const [error, setError] = useState('');

    const validateTitle = () => {
        if (title.trim() === '') {
            setError('Задача не может быть пустой');
            return;
        }
        setError('');
        handleSubmit();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            validateTitle();
        }
    };

    return (
        <div className="todo-form">
            <input
                className="todo-form__input"
                placeholder="Создать задачу"
                value={title}
                onChange={(e) => {
                    handleInput(e.target.value);
                    setError('');
                }}
                onKeyDown={handleKeyDown}
            />
            <button className="todo-form__button" onClick={validateTitle}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="14" width="2" height="30" fill="#30324B" />
                    <rect x="30" y="14" width="2" height="30" transform="rotate(90 30 14)" fill="#30324B" />
                </svg>
            </button>
            {error && <span className="todo-form__error">{error}</span>}
        </div>
    )
}