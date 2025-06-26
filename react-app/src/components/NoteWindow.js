import { useState, useEffect } from 'react';

export function NoteWindow({ note, onChange }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Sync when active note changes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  useEffect(() => {
    onChange({ title, content });
  }, [title, content]);

  function handleContentChange(e) {
    setContent(e.target.value);

    // Auto-grow textarea
    e.target.style.height = 'auto'; // Reset height
    e.target.style.height = e.target.scrollHeight + 'px'; // Adjust to content
    }


  return (
    <div id="note-window">
      <div id="note-content">
        <input
          id="note-content-note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Note title'
        />
        <hr />
        <textarea
          id="note-content-text"
          value={content}
          onChange={handleContentChange}
          placeholder="Write your note's content here"
          rows={1}
        />
      </div>
    </div>
  );
}

export default NoteWindow;
