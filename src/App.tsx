import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { marked } from 'marked'
import { FileToolbar } from './components/FileToolbar'
import './App.css'

function App() {
  const [markdownText, setMarkdownText] = useState('# Welcome to Markdown Editor\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2\n\n```javascript\nconsole.log("Hello World!");\n```')
  const [currentFileName, setCurrentFileName] = useState<string>()

  const handleChange = (value: string) => {
    setMarkdownText(value)
  }

  const handleFileLoad = (content: string, filename?: string) => {
    setMarkdownText(content)
    setCurrentFileName(filename)
  }

  const getPreviewHtml = () => {
    return marked(markdownText)
  }

  return (
    <div className="app">
      <h1>Markdown Editor</h1>
      <FileToolbar 
        markdownText={markdownText}
        onFileLoad={handleFileLoad}
        currentFileName={currentFileName}
      />
      <div className="editor-container">
        <div className="editor-panel">
          <h2>Editor</h2>
          <CodeMirror
            value={markdownText}
            onChange={handleChange}
            extensions={[markdown()]}
            theme={oneDark}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
            }}
          />
        </div>
        <div className="preview-panel">
          <h2>Preview</h2>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
