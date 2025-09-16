import { useEffect, useState } from 'react'
import Header from "./components/Header"
import Todoform from './components/TodoForm'
import TodoList from './components/TodoList'
import Filters from './components/Filters'

// estasdo principal de tareas
export default function App() {
  const [todos, setTodos]= useState(() => {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) :[]
  })
    
  const [filter, setFilter] = useState('all')

  // Guardar en localStorage cada vez que cambien las tareas
  useEffect(() =>{
    localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos] ) // <- se ejecuta cada vez que `todos` cambie

  //Agregar tarea
  function addTodo(text) {
    const newTodo = { id: Date.now(), text, done:false}
    setTodos(prev=> [newTodo, ...prev])
  }

  //Alternar completada
 function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  //Borrar Tarea
  function deleteTodo(id) {
    setTodos(prev=> prev.filter(t => t.id !== id))
  }

  //Editar Tarea
  function editTodo(id, newText) {
    const cleaned =newText.trim()
    if(!cleaned) return
    setTodos(prev => prev.map( t=> t.id === id ?{...t, text: cleaned} :t))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.done))
  }

 const visible = filter === 'all'
  ? todos
  : filter === 'active'
    ? todos.filter(t => !t.done)
    : todos.filter(t => t.done)
    
return (
<div>
  <Header/>
  <Todoform onAdd={addTodo} />

  <div className="controls">
  <Filters current={filter} onChange={setFilter}/>
  <button onClick={clearCompleted}>Borrar Completadas</button>
  </div>

  <TodoList
  items={visible}
  onToggle={toggleTodo} 
  onDelete={deleteTodo}
  onEdit={editTodo}
  />
</div>
)
}