import '../styles/NoteWindow.css';
import { useState, useEffect, useRef } from 'react';

import QuillEditor from "./QuillEditor";


export function NoteWindow({ note, onChange }) {
  const [title, setTitle]     = useState(note.title);
  const [content, setContent] = useState(note.content);
  const textareaRef           = useRef(null);

  // Sync when active note changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  // Propagate changes upstream
  useEffect(() => {
    onChange({ title, content });
  }, [title, content]);

  // Auto-grow textarea whenever `content` changes (including on mount)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }, [content]);

  function handleContentChange(e) {
    setContent(e.target.value);
    // (we no longer need to grow here—it's in the effect)
  }

  if (!note) return null;

  return (
    <div id="note-window">
      <div id="note-content">
        
        {/* Note's title */}
        <input
          id="note-content-note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          autoComplete="off"
          spellCheck="false"
        />

        <hr /> {/* Line between the note's title and content */}

        {/* Note's content */}
        <QuillEditor
          className="note-editor"
          noteId={note.id}
          initialHTML={note.contentHTML || ""}
          onChangeHTML={(html) => onChange({ ...note, contentHTML: html })}
        />

      </div>
    </div>
  );
}

export default NoteWindow;
