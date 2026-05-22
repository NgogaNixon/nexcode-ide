function Sidebar() {
  return (
    <div style={{
      width: '200px',
      background: '#0e1018',
      borderRight: '1px solid #252d3f',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      padding: '12px'
    }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#4a566e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px' }}>
        Snippets
      </div>
      {['Hello World', 'For Loop', 'Fetch API', 'Arrow Function', 'Array Map'].map((name, i) => (
        <div key={i} style={{
          padding: '8px 10px',
          fontSize: '12px',
          color: '#4a566e',
          cursor: 'pointer',
          borderRadius: '6px',
          marginBottom: '4px'
        }}>
          {name}
        </div>
      ))}
    </div>
  )
}

export default Sidebar