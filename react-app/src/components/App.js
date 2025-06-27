import { Sidebar } from './Sidebar';
import NoteWindow from './NoteWindow';
import SettingsModal from './SettingsModal';
import { useState, useEffect } from 'react';
import { getAllNotes, saveNote, deleteNote } from '../db';

function App() {

  const [notes, setNotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1) Load notes from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const stored = await getAllNotes();
      if (stored.length) {
        setNotes(stored);
      } else {
        // fallback default notes
        /*setNotes([
          { title: 'First note', content: '' }
        ]);*/
      }
    })();
  }, []);

  
  const handleAddNote = async () => {
    const newNote = { title: '', content: '' };
    //const newNote = { title: `Untitled ${notes.length+1}`, content: '' };
    const id = await saveNote(newNote);
    setNotes([...notes, { ...newNote, id }]);
    setActiveIndex(notes.length);
  };

  // App.js
  const handleChangeNote = async (updatedNote) => {
    // preserve id
    const noteWithId = { ...updatedNote, id: notes[activeIndex].id };
    // update state
    const updated = [...notes];
    updated[activeIndex] = noteWithId;
    setNotes(updated);
    // save back to IndexedDB
    await saveNote(noteWithId);   // this calls put, updating the existing record
  };


  const handleDelete = (index) => {
    const noteToDelete = notes[index];
    deleteNote(noteToDelete.id);
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    setActiveIndex(i => Math.max(0, i - 1));
  };


  return (
    <div id="app-window">
      <Sidebar
        notes={notes}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onAddNote={handleAddNote}
      />

      {notes.length > 0 && (
        <NoteWindow
          note={notes[activeIndex]}
          onChange={handleChangeNote}
        />
      )}



    </div>
  );
}

export default App;
