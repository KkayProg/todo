import { TodoForm } from './components/TodoForm.jsx';
import './App.css';
import { TodoList } from './components/TodoList.jsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';

function App() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo({title}))
    setTitle('');
  }

  return (
    <div className="App">
      <h1 className='app__title'>Список дел</h1>
      <TodoForm
        title={title}
        handleInput={setTitle}
        handleSubmit={addTask}
      />
      <TodoList />
    </div>
  );
}

export default App;
