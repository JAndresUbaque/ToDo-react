import TodoItem from "./TodoItem";

export default function TodoList({ items, onToggle, onDelete, onEdit}) {
    if (!items || items.length === 0 ) return<p> No hay tareas</p>
    
    return (
        <ul>
            { items.map( item => (
                <TodoItem
                key={item.id}
                todo={item}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                />
            ))}
        </ul>
    )
}