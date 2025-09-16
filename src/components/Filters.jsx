export default function Filters({ current, onChange }) {
  return (
    <>
      <button 
        onClick={() => onChange("all")} 
        className={current === "all" ? "active" : ""}
      >
        Todas
      </button>

      <button 
        onClick={() => onChange("active")} 
        className={current === "active" ? "active" : ""}
      >
        Activas
      </button>

      <button 
        onClick={() => onChange("done")} 
        className={current === "done" ? "active" : ""}
      >
        Completadas
      </button>
    </>
  )
}