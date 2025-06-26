import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faGear, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';




export function Sidebar({ notes, setNotes, activeIndex, setActiveIndex }) {
  return (
    <div id="sidebar">
      {/* Top part */}
      <div id="sidebar-div-1">
        <div id="title-name-div">
          <p>ZeroCloud</p>
          <FontAwesomeIcon icon={faAnglesLeft} id='icon-faAnglesLeft' />
        </div>
        <div className='sidebar-options-div-item'>
          <FontAwesomeIcon icon={faGear} />
          <p>Settings</p>
        </div>
        <div
          className='sidebar-options-div-item'
          onClick={() => {
            const newNote = { title: `Untitled ${notes.length + 1}`, content: "" };
            setNotes([...notes, newNote]);
            setActiveIndex(notes.length);
        }}

        >
          <FontAwesomeIcon icon={faPlus} />
          <p>New note</p>
        </div>
        <div className='sidebar-options-div-item'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <p>Search note</p>
        </div>
      </div>

      {/* Notes (bottom) part */}
      <div id="sidebar-div-2">
        <p id='sidebar-div-2-title'>Your notes</p>

        <div id='sidebar-div-2-notes-div'>
          {notes.map((note, index) => (
            <div
                className={`note-div ${index === activeIndex ? 'active-note' : ''}`}
                onClick={() => setActiveIndex(index)}
                key={index}
            >
                <p>{note.title}</p>
            </div>
            ))}

        </div>
      </div>
    </div>
  );
}


export default Sidebar;