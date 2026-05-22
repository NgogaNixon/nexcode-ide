function Topbar({ language, setLanguage, runCode, onExplain, onFix }) {
  return (
    <div style={{
      height: '44px',
      background: '#0e1018',
      borderBottom: '1px solid #252d3f',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: '10px',
      flexShrink: 0
    }}>
      <div style={{ fontFamily: 'sans-serif', fontSize: '17px', fontWeight: 800, color: '#00d4ff', marginRight: '8px' }}>
        Nex<span style={{ color: '#a78bfa' }}>Code</span>
      </div>

      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={{
          background: '#141720',
          border: '1px solid #252d3f',
          color: '#c9d1e0',
          padding: '5px 10px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '12px',
          cursor: 'pointer'
        }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="json">JSON</option>
      </select>

      <button
        onClick={runCode}
        style={{
          background: '#00e676',
          color: '#08090d',
          border: 'none',
          padding: '6px 16px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Run
      </button>

      <button
        onClick={onExplain}
        style={{
          background: 'transparent',
          color: '#00d4ff',
          border: '1px solid #00d4ff',
          padding: '6px 16px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Explain
      </button>

      <button
        onClick={onFix}
        style={{
          background: 'transparent',
          color: '#a78bfa',
          border: '1px solid #a78bfa',
          padding: '6px 16px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Fix Bug
      </button>
    </div>
  )
}

export default Topbar