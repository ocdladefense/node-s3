/** @jsx vNode */

// Load the required clients and packages
const { vNode } = require('@ocdladefense/view');



const File = function(props) {
  const file = props.file;

  /*
  const href = "https://s3." + REGION + ".amazonaws.com/";
  const bucketUrl = href + "web-governance/";
  const fileKey = file.Key;
  const fileUrl = bucketUrl + encodeURIComponent(fileKey);
  */
 
  return (
    <li class="directory-item" data-prefix="" data-key={file.Key}>
      <a target="_new" href={fileUrl} data-type="folder">
        <img class="file-icon" src="/content/uploads/file-icon.png" />
        <span class="file file-name">
          {file.Name}
        </span>
      </a>
    </li>
  )
};