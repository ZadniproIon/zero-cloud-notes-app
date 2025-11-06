import { Sidebar } from './components/Sidebar';
import NoteWindow from './components/NoteWindow';
import SettingsModal from './components/SettingsModal';
import dummyNotes from './assets/dummy-notes.json';
import { useState, useEffect } from 'react';
import { getAllNotes, saveNote, deleteNote, clearAllNotes } from './services/db';
import { get as kvGet, keys as kvKeys, del as kvDel } from 'idb-keyval';
import "./styles/App.css";

// in src/main.jsx or App.jsx
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';




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

    // Merge with current to avoid dropping fields like contentHTML
    const merged = { ...currentNote, ...updatedNote };

    // Skip save only if nothing changed (title, content, contentHTML)
    const noChange =
      merged.title === currentNote.title &&
      merged.content === currentNote.content &&
      merged.contentHTML === currentNote.contentHTML;
    if (noChange) return;

    const timestamp = new Date().toISOString();
    const noteWithId = {
      ...merged,
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

  const handleImportDummyNotes = async () => {
    const now = new Date().toISOString();
    const created = [];
    for (const d of dummyNotes) {
      const toSave = {
        title: d.title || '',
        content: d.content ?? '',
        contentHTML: d.contentHTML || '',
        lastEdited: now,
        isDummy: true,
      };
      const id = await saveNote(toSave);
      created.push({ ...toSave, id });
    }
    // Merge into state and focus the most recent imported note
    setNotes((prev) => [...prev, ...created]);
    if (created.length) {
      setActiveIndex((prev) => prev < 0 ? notes.length : notes.length + created.length - 1);
    }
  };

  const handleExportNotes = async () => {
    try {
      // ensure we have the latest from DB
      const all = await getAllNotes();
      const minimal = await Promise.all(
        all.map(async (n) => {
          let html = n.contentHTML ?? '';
          if ((!html || html === '<p><br></p>') && n?.id != null) {
            try {
              const cached = await kvGet(`zc:quill:html:${n.id}`);
              if (typeof cached === 'string') html = cached;
            } catch (_) {
              // ignore fallback failure
            }
          }
          return {
            title: n.title ?? '',
            contentHTML: html ?? '',
            lastEdited: n.lastEdited ?? null,
          };
        })
      );
      const blob = new Blob([JSON.stringify(minimal, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      a.href = url;
      a.download = `zero-cloud-notes-export-${ts}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export notes. See console for details.');
    }
  };

  const handleImportActualNotes = async (importedArr) => {
    try {
      const now = new Date().toISOString();
      const created = [];
      for (const raw of importedArr) {
        const toSave = {
          title: raw.title ?? '',
          content: '',
          contentHTML: raw.contentHTML ?? '',
          lastEdited: raw.lastEdited ?? raw.lastSaved ?? now,
        };
        const id = await saveNote(toSave);
        created.push({ ...toSave, id });
      }
      setNotes(prev => [...prev, ...created]);
      if (created.length) {
        setActiveIndex(prev => (prev < 0 ? notes.length : notes.length + created.length - 1));
      }
      alert(`Imported ${created.length} notes.`);
    } catch (err) {
      console.error('Import failed:', err);
      alert('Failed to import notes. See console for details.');
    }
  };

  const handleDeleteAllNotes = async () => {
    const ok = window.confirm('Delete ALL notes? This cannot be undone.');
    if (!ok) return;
    try {
      await clearAllNotes();
      // Clear Quill caches
      try {
        const allKeys = await kvKeys();
        const toDelete = allKeys.filter(
          (k) => typeof k === 'string' && (k.startsWith('zc:quill:html:') || k.startsWith('zc:quill:delta:'))
        );
        await Promise.all(toDelete.map((k) => kvDel(k)));
      } catch (_) {
        // non-fatal if key cleanup fails
      }
      setNotes([]);
      setActiveIndex(-1);
      alert('All notes deleted.');
    } catch (err) {
      console.error('Delete all failed:', err);
      alert('Failed to delete all notes. See console for details.');
    }
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
            onDelete={() => handleDelete(activeIndex)}
          />
        )}

      </div>

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onImportDummyNotes={handleImportDummyNotes}
          onImportActualNotes={handleImportActualNotes}
          onExportNotes={handleExportNotes}
          onDeleteAllNotes={handleDeleteAllNotes}
        />
      )}
      
    </>
    
  );
}

export default App;
