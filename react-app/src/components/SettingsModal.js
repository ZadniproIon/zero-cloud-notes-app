import './SettingsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faPalette, faCircleInfo, faTrash, faUpload, faDownload, faCube } from '@fortawesome/free-solid-svg-icons';


export function SettingsModal() {

    return (
        <div id="settings-modal">
            <div id="settings-modal-sidebar">
                <button onclick="showTab('general')"><FontAwesomeIcon icon={faSliders} />General</button>
                <button onclick="showTab('appearance')"><FontAwesomeIcon icon={faPalette} />Appearance</button>
                <button onclick="showTab('about')"><FontAwesomeIcon icon={faCircleInfo} />About</button>
            </div>
            <div id="settings-modal-content">      
                
                {/* General tab */}
                <div class="tab" id="general">
                    <h2>Hello, dear user!</h2>
                    <div id='general-options-div'>
                        <div><p>Import dummy notes</p><button><FontAwesomeIcon icon={faCube} />Import</button></div>
                        <div><p>Import (actual) notes</p><button><FontAwesomeIcon icon={faUpload} />Import</button></div>
                        <div><p>Export notes</p><button><FontAwesomeIcon icon={faDownload} />Export</button></div>
                        <div><p>Delete all notes</p><button id='delete-button'><FontAwesomeIcon icon={faTrash} />Delete</button></div>
                    </div>
                    
                </div>

                {/* Appearance tab */}
                <div class="tab" id="appearance">
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
                <div class="tab active" id="about">
                    <h2>ZeroCloud - notes app</h2>
                    <p><strong>Fully</strong> offline</p>
                    <p><strong>Light</strong> weight</p>
                    <p><strong>Privacy</strong> focused</p>
                    <p><strong>Version</strong> 0.0.1 (beta)</p>
                    <p><strong>Last update</strong> 21.04.2025</p>
                    <button>GitHub</button>
                    <button>Telegram</button>
                </div>
            </div>
        </div>

    );
}

export default SettingsModal;