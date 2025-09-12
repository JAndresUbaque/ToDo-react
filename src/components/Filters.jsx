export default function Filters({ current, onChange}) {
    return (
        <div role="tablist" className="filters">
            <button aria-pressed={current === 'all'} 
            onClick={() => onChange('all')}>
                Todas
          </button> 

          <button aria-pressed={ current === 'active'}
          onClick={() => onchange('active')}> 
            Activas 
          </button>

          <button aria-pressed ={current === 'done'}
          onClick={() => onChange('done')}>
           Completadas
          </button>

        </div>
    )
}