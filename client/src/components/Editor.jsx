import { useState, useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Terminal from './Terminal'
import AIPanel from './AIPanel'
import Tabs from './Tabs'

const defaultFiles = [
  { id: 1, name: 'main.js', language: 'javascript', content: '// Start coding here\nconsole.log("Hello, NexCode!");\n' },
  { id: 2, name: 'index.html', language: 'html', content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My App</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>\n' },
]

function Editor() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFile, setActiveFile] = useState(1)
  const [output, setOutput] = useState([])
  const [activePanel, setActivePanel] = useState('terminal')
  const [aiPrompt, setAiPrompt] = useState('')
  const aiPanelRef = useRef(null)

  const currentFile = files.find(f => f.id === activeFile)

  const updateCode = (val) => {
    setFiles(prev => prev.map(f => f.id === activeFile ? { ...f, content: val || '' } : f))
  }

  const setLanguage = (lang) => {
    setFiles(prev => prev.map(f => f.id === activeFile ? { ...f, language: lang } : f))
  }

  const addFile = () => {
    const name = prompt('File name:', 'newfile.js')
    if (!name) return
    const ext = name.split('.').pop()
    const langMap = { js: 'javascript', html: 'html', css: 'css', json: 'json', py: 'python' }
    const language = langMap[ext] || 'javascript'
    const id = Date.now()
    setFiles(prev => [...prev, { id, name, language, content: '' }])
    setActiveFile(id)
  }

  const closeFile = (id) => {
    if (files.length === 1) return
    const remaining = files.filter(f => f.id !== id)
    setFiles(remaining)
    if (activeFile === id) setActiveFile(remaining[0].id)
  }

  const runCode = () => {
    const logs = []
    const originalLog = console.log
    const originalError = console.error
    console.log = (...args) => logs.push({ type: 'out', text: args.join(' ') })
    console.error = (...args) => logs.push({ type: 'err', text: args.join(' ') })
    try {
      const fn = new Function(currentFile.content)
      fn()
      if (logs.length === 0) logs.push({ type: 'dim', text: '(no output)' })
    } catch (e) {
      logs.push({ type: 'err', text: e.message })
    } finally {
      console.log = originalLog
      console.error = originalError
    }
    setOutput(logs)
    setActivePanel('terminal')
  }

const onExplain = () => {
    setActivePanel('ai')
    setTimeout(() => {
      setAiPrompt('Explain this code in simple terms')
    }, 100)
  }

  const onFix = () => {
    setAiPrompt('Find and fix any bugs in this code')
    setActivePanel('ai')
  }

  const tabStyle = (panel) => ({
    padding: '7px 18px',
    background: 'transparent',
    border: 'none',
    borderBottom: activePanel === panel ? '2px solid #00d4ff' : '2px solid transparent',
    color: activePanel === panel ? '#00d4ff' : '#4a566e',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '.06em'
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0c10', color: '#c9d1e0' }}>
      <Topbar
        language={currentFile.language}
        setLanguage={setLanguage}
        runCode={runCode}
        onExplain={onExplain}
        onFix={onFix}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Tabs
            files={files}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            addFile={addFile}
            closeFile={closeFile}
          />
          <div style={{ height: '50%' }}>
            <MonacoEditor
              height="100%"
              language={currentFile.language}
              value={currentFile.content}
              onChange={updateCode}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontFamily: 'monospace',
                automaticLayout: true,
              }}
              loading={
                <div style={{ color: '#00d4ff', padding: '20px', background: '#1e1e1e', height: '100%' }}>
                  Loading editor...
                </div>
              }
            />
          </div>
          <div style={{ height: '45%', borderTop: '1px solid #252d3f', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', background: '#0e1018', borderBottom: '1px solid #252d3f', flexShrink: 0 }}>
              <button style={tabStyle('terminal')} onClick={() => setActivePanel('terminal')}>
                Terminal
              </button>
              <button style={tabStyle('ai')} onClick={() => setActivePanel('ai')}>
                AI Chat
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {activePanel === 'terminal' ? (
                <Terminal output={output} />
              ) : (
                <AIPanel
                  code={currentFile.content}
                  language={currentFile.language}
                  autoPrompt={aiPrompt}
                  clearAutoPrompt={() => setAiPrompt('')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor