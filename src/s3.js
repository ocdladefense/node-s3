/** @jsx vNode */

const { vNode, View } = require('@ocdladefense/view/view.js');

// Load the required clients and packages
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");






// Initialize the Amazon Cognito credentials provider
let s3;


function createClient(region, identityPoolId) {
  s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identityPoolId
    })
  });

}






// A utility function to create HTML.
function getHtml(template) {
  return template.join("\n");
}


/**
 * S3 folders and object key names:
 *  https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
 * 
 * Webpack:
 *  https://webpack.js.org/configuration/mode/
 * 
 */





 const ls = async function ls(bucket, prefix) {


    let config = {
        Delimiter: "/",
        Bucket: bucket
    };

    if(prefix) {
      config.Prefix = prefix
    }



    const data = await s3.send(
        new ListObjectsCommand(config)
    );

    console.log(data);

  

  let files = data.Contents || [];

  files = files.filter((file) => { return file.Key.indexOf("Thumbs.db") === -1; });
  
  files = files.map(
    (obj) => { obj.Name = decodeURIComponent(obj.Key.replace(prefix, "")); return obj; }
  );

  console.log(files);

  let folders = data.CommonPrefixes || [];

  folders = folders.map(
    (folder) => { folder.Name = decodeURIComponent(folder.Prefix.replace(prefix, "")); return folder; }
  );

  console.log(folders);

  const message = folders.length
  ? "Click a folder to view its contents." : "No folders found.";

  const root = View.createRoot("#viewer");
  root.render(<Directory folders={folders} files={files} messaage={message} />);
  // root.update() // add to the HISTORY for this instance of the view object.
};



const Directory = function(props) {

  console.log(props);
  
  const folders = props.folders.map((folder) => { return <Folder folder={folder} />; });
  const files = props.files.map((file) => { return <File file={file} />; });
  // const folders = [<Folder name="Hello" />,<Folder name="foobar" />];

  return (
    <div class="component">
      <p class="message">{props.message}</p>
      <div class="folders">
        <ul>
          {folders}
        </ul>
      </div>
      <div class="files">
      <p>{props.message}</p>
      <ul>
        {files}
      </ul>
    </div>
  </div>
  )
};



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


const File = function(props) {
  const file = props.file;

  const href = "https://s3." + REGION + ".amazonaws.com/";
  const bucketUrl = href + "web-governance/";
  const fileKey = file.Key;
  const fileUrl = bucketUrl + encodeURIComponent(fileKey);

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





// Make the getHTML function available to the browser
window.getHTML = getHtml;

// List the photo albums that exist in the bucket
// Make the viewAlbum function available to the browser
window.ls = ls;

// Make the viewAlbum function available to the browser
window.listFiles = listFiles;



//for unit tests only
export { ls, createClient };
