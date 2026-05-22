function Tabs({ files, activeFile, setActiveFile, addFile, closeFile }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      background: '#0e1018',
      borderBottom: '1px solid #252d3f',
      overflowX: 'auto',
      flexShrink: 0,
      height: '38px'
    }}>
      {files.map(file => (
        <div
          key={file.id}
          onClick={() => setActiveFile(file.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            fontSize: '12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            borderRight: '1px solid #252d3f',
            background: activeFile === file.id ? '#1e1e1e' : 'transparent',
            color: activeFile === file.id ? '#c9d1e0' : '#4a566e',
            borderTop: activeFile === file.id ? '1px solid #00d4ff' : '1px solid transparent',
            transition: '.12s'
          }}
        >
          <span>{file.name}</span>
          <span
            onClick={(e) => { e.stopPropagation(); closeFile(file.id) }}
            style={{
              color: '#4a566e',
              fontSize: '14px',
              lineHeight: 1,
              padding: '0 2px',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.target.style.color = '#ff4b6e'}
            onMouseLeave={e => e.target.style.color = '#4a566e'}
          >
            x
          </span>
        </div>
      ))}
      <div
        onClick={addFile}
        style={{
          padding: '6px 14px',
          fontSize: '18px',
          cursor: 'pointer',
          color: '#4a566e',
          lineHeight: 1
        }}
        onMouseEnter={e => e.target.style.color = '#00d4ff'}
        onMouseLeave={e => e.target.style.color = '#4a566e'}
      >
        +
      </div>
    </div>
  )
}

export default Tabs