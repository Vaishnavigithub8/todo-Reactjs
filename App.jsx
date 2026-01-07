import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2 } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
        Todo List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 text-white px-4 rounded-lg hover:bg-indigo-600"
          >
            Add
          </button>
        </div>

        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-2 shadow-sm"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {todo.text}
              </span>

              <div className="flex gap-2">
                <button onClick={() => toggleTodo(todo.id)}>
                  <Check className="w-5 h-5 text-green-500" />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No tasks yet 
          </p>
        )}
      </div>
    </div>
  );
}
