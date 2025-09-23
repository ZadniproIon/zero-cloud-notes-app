import '../styles/SettingsModal.css';
import { useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faPalette, faCircleInfo, faTrash, faUpload, faDownload, faCube } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';



export function SettingsModal({ onClose }) {

    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div id="settings-modal" onClick={e => e.stopPropagation()}>
                <div id="settings-modal-sidebar">
                    <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faSliders} />General
                    </button>
                    <button onClick={() => setActiveTab('appearance')} className={activeTab === 'appearance' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faPalette} />Appearance
                    </button>
                    <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
                        <FontAwesomeIcon icon={faCircleInfo} />About
                    </button>
                </div>
                <div id="settings-modal-content">      
                    
                    {/* General tab */}
                    <div className={`tab ${activeTab === 'general' ? 'active' : ''}`} id="general">
                        <h2>Hello, dear user!</h2>
                        <div id='general-options-div'>
                            <div><p>Import dummy notes</p><button><FontAwesomeIcon icon={faCube} />Import</button></div>
                            <div><p>Import (actual) notes</p><button><FontAwesomeIcon icon={faUpload} />Import</button></div>
                            <div><p>Export notes</p><button><FontAwesomeIcon icon={faDownload} />Export</button></div>
                            <div><p>Delete all notes</p><button id='delete-button'><FontAwesomeIcon icon={faTrash} />Delete</button></div>
                        </div>
                        
                    </div>

                    {/* Appearance tab */}
                    <div className={`tab ${activeTab === 'appearance' ? 'active' : ''}`} id="appearance">
                        <label>Font size (note only)
                            <select>
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select>
                        </label>
                        <label>Font family
                            <select>
                                <option>Inter</option>
                                <option>Roboto</option>
                            </select>
                        </label>
                        <label>Theme
                            <select>
                                <option>System</option>
                                <option>Light</option>
                                <option>Dark</option>
                            </select>
                        </label>
                        <label>Color palette
                            <select>
                                <option>Default</option>
                            </select>
                        </label>
                        <label>Line spacing
                            <select>
                                <option>1.25</option>
                                <option>1.5</option>
                                <option>1.75</option>
                            </select>
                        </label>
                        <label>
                            Full-width
                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider"></span>
                            </label>
                        </label>
                        

                    </div>

                    {/* About tab */}
                    <div className={`tab ${activeTab === 'about' ? 'active' : ''}`} id="about">
                        <h2>ZeroCloud – notes app</h2>

                        <div className="about-description">
                            <div className="about-left">
                                <p>
                                Fully<br/>
                                Light<br/>
                                Privacy<br/>
                                Version<br/>
                                Last update
                                </p>
                            </div>
                            <div className="about-right">
                                <p>
                                offline<br/>
                                weight<br/>
                                focused<br/>
                                0.0.1 (beta)<br/>
                                21.04.2025
                                </p>
                            </div>
                        </div>


                        <div className="about-links">
                            <a href="https://github.com/YourRepo" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} /> GitHub
                            </a>
                            <a href="https://t.me/YourHandle" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTelegram} /> Telegram
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default SettingsModal;