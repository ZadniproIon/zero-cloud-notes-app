import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faGear, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function Sidebar() {




    return (
        <div id="sidebar">

            {/* Top part */}
            <div id="sidebar-div-1">
                <div id="title-name-div">
                    <p>ZeroCloud</p>
                    <FontAwesomeIcon icon={faAnglesLeft} id='icon-faAnglesLeft'/>
                </div>
                <div className='sidebar-options-div-item'>
                    <FontAwesomeIcon icon={faGear} />
                    <p>Settings</p>
                </div>
                <div className='sidebar-options-div-item'>
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
                    <div className='note-div active-note'><p>This is the title of my note</p></div>
                    <div className='note-div'><p>Movie diary</p></div>
                    <div className='note-div'><p>Workout regime</p></div>
                    <div className='note-div'><p>This note has a longer name</p></div>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;