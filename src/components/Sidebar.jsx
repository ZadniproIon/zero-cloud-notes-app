import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faGear, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
//import { saveNote } from '../db';   // adjust the path if needed




export function Sidebar({ notes, activeIndex, setActiveIndex, onAddNote, onOpenSettings }) {
  return (
    <div id="sidebar">
      {/* Top part */}
      <div id="sidebar-div-1">
        <div id="title-name-div">
          <p>ZeroCloud</p>
          <FontAwesomeIcon icon={faAnglesLeft} id='icon-faAnglesLeft' />
        </div>
        <div className='sidebar-options-div-item' onClick={onOpenSettings}>
          <FontAwesomeIcon icon={faGear} />
          <p>Settings</p>
        </div>
        <div
          className='sidebar-options-div-item'
          onClick={onAddNote}
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>New note</p>
        </div>
        {/*<div className='sidebar-options-div-item'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <p>Search note</p>
        </div>*/}
      </div>

      {/* Notes (bottom) part */}
      <div id="sidebar-div-2">
        <p id='sidebar-div-2-title'>Your notes</p>

        <div id='sidebar-div-2-notes-div'>
        {[...notes]
          .sort((a, b) => new Date(b.lastEdited || 0) - new Date(a.lastEdited || 0))
          .map((note, sortedIndex) => {
            const realIndex = notes.findIndex(n => n.id === note.id); // to track the original index
            return (
              <div
                className={`note-div ${realIndex === activeIndex ? 'active-note' : ''}`}
                key={note.id}
                onClick={() => setActiveIndex(realIndex)}
              >
                <p>{note.title.trim() || 'Untitled note'}</p>
              </div>
            );
          })}


        </div>
      </div>
    </div>
  );
}


export default Sidebar;