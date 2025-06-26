import { Sidebar } from './Sidebar';
import NoteWindow from './NoteWindow';
import SettingsModal from './SettingsModal';
import { useState } from 'react';

function App() {

  const [notes, setNotes] = useState([
    { title: "This is the title of my note", content: "Lorem ipsum dolor sit amet..." },
    { title: "Movie diary", content: "Saw Blade Runner 2049 again." },
    { title: "Workout regime", content: "Push/pull/legs split." },
    { title: "This note has a longer name ffffffffff", content: "" }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id="app-window">
      <Sidebar
        notes={notes}
        setNotes={setNotes}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <NoteWindow
        note={notes[activeIndex]}
        onChange={(updatedNote) => {
          const updatedNotes = [...notes];
          updatedNotes[activeIndex] = updatedNote;
          setNotes(updatedNotes);
        }}
      />

    </div>
  );



  return (
    <div id=''>
      <Sidebar />
      <NoteWindow />
    </div>
  );
}

export default App;
