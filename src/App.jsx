import { Sidebar } from './components/Sidebar';
import NoteWindow from './components/NoteWindow';
import SettingsModal from './components/SettingsModal';
import { useState, useEffect } from 'react';
import { getAllNotes, saveNote, deleteNote } from './services/db';
import "./styles/App.css"

function App() {

  const [notes, setNotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSettings, setShowSettings] = useState(false);

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
    const timestamp = new Date().toISOString();
    const newNote = { title: '', content: '', lastEdited: timestamp };
    const id = await saveNote(newNote);
    setNotes([...notes, { ...newNote, id }]);
    setActiveIndex(notes.length);
  };
  

  
  const handleChangeNote = async (updatedNote) => {
    const currentNote = notes[activeIndex];
  
    // Don't update if content didn't change
    if (
      updatedNote.title === currentNote.title &&
      updatedNote.content === currentNote.content
    ) {
      return; // do nothing
    }
  
    const timestamp = new Date().toISOString();
    const noteWithId = {
      ...updatedNote,
      id: currentNote.id,
      lastEdited: timestamp,
    };
  
    const updated = [...notes];
    updated[activeIndex] = noteWithId;
    setNotes(updated);
    await saveNote(noteWithId);
  };
  
  

  const handleDelete = (index) => {
    const noteToDelete = notes[index];
    deleteNote(noteToDelete.id);
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    setActiveIndex(i => Math.max(0, i - 1));
  };


  return (
    <>
      <div id="app-window">
        <Sidebar
          notes={notes}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onAddNote={handleAddNote}
          onOpenSettings={() => setShowSettings(true)}
        />

        {activeIndex >= 0 && notes[activeIndex] && (
          <NoteWindow
            note={notes[activeIndex]}
            onChange={handleChangeNote}
          />
        )}

      </div>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
      
    </>
    
  );
}

export default App;
