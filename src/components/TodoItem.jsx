import { useState, useEffect, useRef } from "react"

export default  function TodoItem({todo, onToggle, onDelete, onEdit }){

    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(todo.text)
    const inputRef = useRef(null)
        
      useEffect(() => {
    if (editing) {
      setDraft(todo.text)               // cargamos el texto actual en el draft
      inputRef.current?.focus()         // enfocamos el input si existe (?. evita errores)
    }
  }, [editing, todo.text])               // dependencias: se corre cuando editing o todo.text cambian

  // guardar la edición: limpia, valida y notifica al padre con onEdit
  function handleSave() {
    const value = draft.trim()          // quitar espacios sobrantes
    if (!value) {                        // si quedó vacío, no guardamos
      setDraft(todo.text)                // restauramos el texto original
      setEditing(false)
      return
    }
    onEdit(todo.id, value)               // avisamos a App que actualice la tarea
    setEditing(false)                    // salimos de modo edición
  }

  // teclas rápidas: Enter guarda, Escape cancela la edición
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    else if (e.key === 'Escape') {
      setDraft(todo.text)                // restaurar
      setEditing(false)
    }
  }

  function handleDelete() {
    const li = document.getElementById(`todo-${todo.id}`) // seleccionamos el <li>
    li.classList.add("fade-out")                          // le aplicamos la animación
    setTimeout(() => onDelete(todo.id), 300)              // esperamos 300ms y borramos
    } 
    
    return(
    <li id={`todo-${todo.id}`} className="todo-item">
        <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        />

        {editing ? (
       <input
        ref={inputRef}
        className="edit-input"
        value={draft}
        onChange={(e)=> setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        aria-hidden={!editing}
        /> 
        ):( 
          <span className={todo.done ? "done" : ""}>{todo.text}</span>
      )}
        <button onClick={()=> editing ? handleSave():setEditing(true)}>{editing ? 'Guardar' : 'Editar'}</button>
        
        <button onClick={handleDelete}>Borrar</button>
         
    </li>
)
}