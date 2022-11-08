/** @jsx vNode */

// Load the required clients and packages
const { vNode, View } = require('@ocdladefense/view');
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



window.ls = ls;
window.createClient = createClient;

