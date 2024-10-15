import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { TodoStore } from './stores/todo.store';
import { ITodo } from './models/todo.model';

const initialTodos: ITodo[] = [
  {
    title: 'Wake up at',
    completed: false,
  } as ITodo,
  {
    title: 'Brush teeth',
    completed: false,
  } as ITodo,
  {
    title: 'Take a shower',
    completed: false,
  } as ITodo,
  {
    title: 'Get dressed',
    completed: false,
  } as ITodo,
  {
    title: 'Eat breakfast',
    completed: true,
  } as ITodo,
];

const todoStore = TodoStore;

if (!todoStore.todos.length) {
  initialTodos.forEach((todo: ITodo) => todoStore.addTodo(todo));
}

const App: React.FC = observer(() => {
  const todoInput = useRef<HTMLInputElement>(null);

  const onAddClick = () => {
    const inputValue = todoInput.current?.value;
    if (inputValue) {
      todoStore.addTodo({
        title: inputValue,
        completed: false,
      } as ITodo);
      if (todoInput.current) {
        todoInput.current.value = '';
      }
    }
  };

  return (
    <main className="flex flex-col gap-3 p-5">
      {/* Header */}
      <header>
        My Todo List{' '}
        {todoStore.isAllComplete
          ? '- All Done 🎉'
          : '(Left: ' + todoStore.uncompletedItems + ')'}
      </header>

      {/* Main Content */}
      <section>
        <ul className="flex flex-col gap-2">
          {todoStore.filteredTodos.length > 0 ? (
            todoStore.filteredTodos.map((todo: ITodo, index: number) => (
              <li
                key={index}
                className={`flex flex-row justify-between border border-gray-200 px-2 py-1 rounded-sm dark:hover:bg-gray-700 ${
                  todo.completed ? '!bg-yellow-500' : ''
                }`}
              >
                <div className="flex flex-row gap-2">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => todo.setCompleted(!todo.completed)}
                  />
                  <label>{todo.title}</label>
                </div>

                <button
                  className="bg-rose-600 hover:bg-rose-500 px-3 text-xs rounded-[4px] justify-end text-white"
                  onClick={() => todoStore.removeTodo(todo)}
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <h1 className="bg-cyan-700 px-3 py-2 text-sm rounded-sm">
              No Todo Item
            </h1>
          )}
        </ul>
      </section>

      {/* Form */}
      <section>
        <div className="flex flex-row gap-2 w-full">
          <input
            ref={todoInput}
            className="rounded-md px-2 py-2 text-xs dark:text-gray-800 w-full border border-gray-400 dark:bg-gray-700 dark:text-white"
            placeholder="todo"
          />
          <button
            className="px-2 py-1 bg-yellow-500 rounded-md dark:text-gray-700 text-xs"
            onClick={onAddClick}
          >
            Add
          </button>
        </div>
      </section>

      {/* Other Actions */}
      <footer>
        <div className="flex flex-row gap-1">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={todoStore.isAllComplete}
            onChange={() => todoStore.setCompleteAll(!todoStore.isAllComplete)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </div>
      </footer>
    </main>
  );
});

export default App;
