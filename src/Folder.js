/** @jsx vNode */

// Load the required clients and packages
const { vNode } = require('@ocdladefense/view');


const Folder = function(props) {
    const folder = props.folder;
    
    return (
        <li class="directory-item" data-prefix={folder.Prefix}>
          <a href="#" data-type="folder" data-prefix={folder.Prefix}>
            <img class="folder-icon" src="data:image/png;base64,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" alt="" />
            <span class="folder folder-name">
              {folder.Name}
            </span>
          </a>
        </li>
      )
      
  };