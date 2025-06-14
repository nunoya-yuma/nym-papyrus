import { useRef } from 'react'
import { saveTextAsFile, loadFileAsText, isMarkdownFile } from '../utils/fileUtils'
import './FileToolbar.css'

interface FileToolbarProps {
  markdownText: string
  onFileLoad: (content: string, filename?: string) => void
  currentFileName?: string
}

export function FileToolbar({ markdownText, onFileLoad, currentFileName }: FileToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    const filename = currentFileName || 'document.md'
    saveTextAsFile(markdownText, filename)
  }

  const handleLoadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!isMarkdownFile(file.name)) {
      alert('Please select a Markdown file (.md, .markdown, etc.)')
      return
    }

    try {
      const content = await loadFileAsText(file)
      onFileLoad(content, file.name)
    } catch (error) {
      alert('Error loading file: ' + (error as Error).message)
    }

    // Reset input to allow loading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleNewFile = () => {
    onFileLoad('# New Document\n\nStart writing your markdown here...', 'new-document.md')
  }

  return (
    <div className="file-toolbar">
      <div className="file-toolbar-section">
        <button onClick={handleNewFile} className="toolbar-button">
          📄 New
        </button>
        <button onClick={handleLoadClick} className="toolbar-button">
          📂 Open
        </button>
        <button onClick={handleSave} className="toolbar-button">
          💾 Save
        </button>
      </div>
      
      {currentFileName && (
        <div className="current-file">
          <span className="file-name">{currentFileName}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.mdown,.mkd,.mdx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}