import { useState } from "react";

export default function Todoform({ onAdd }){
    const [ text, setText] = useState('')


function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim())
    setText('')
}

return (
    <form onSubmit={handleSubmit}>
        <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una tarea..."
        />
        <button>Añadir</button>
    </form>
)
}