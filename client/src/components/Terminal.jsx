function Terminal({ output }) {
  const colors = {
    out: '#00e676',
    err: '#ff4b6e',
    dim: '#4a566e',
    info: '#ffca28'
  }

  return (
    <div style={{
      flex: 1,
      background: '#08090d',
      padding: '12px 16px',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '12px',
      lineHeight: '1.7',
      overflowY: 'auto',
      height: '100%'
    }}>
      {output.length === 0 ? (
        <div style={{ color: '#4a566e' }}>▶ Press Run to execute your code...</div>
      ) : (
        output.map((line, i) => (
          <div key={i} style={{ color: colors[line.type] || '#c9d1e0', marginBottom: '2px' }}>
            {line.type === 'err' ? '✖ ' : '  '}{line.text}
          </div>
        ))
      )}
    </div>
  )
}

export default Terminal