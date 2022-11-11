

// Load the required clients and packages
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");







/**
 * S3 folders and object key names:
 *  https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
 * 
 * Webpack:
 *  https://webpack.js.org/configuration/mode/
 * 
 */
 async function ls(prefix) {


  let file, folders, message;


  let config = {
      Delimiter: "/",
      Bucket: this.bucket
  };

  if(prefix) {
    config.Prefix = prefix
  }



  const data = await this.client.send(
      new ListObjectsCommand(config)
  );

  



  files = data.Contents || [];
  folders = data.CommonPrefixes || [];

  files = files.filter((file) => { return file.Key.indexOf("Thumbs.db") === -1; });
  
  files = files.map(
    (obj) => { 
      obj.Name = decodeURIComponent(obj.Key.replace(prefix, ""));
      let href = "https://s3." + this.region + ".amazonaws.com/";
      let bucketUrl = href + this.bucket + "/";
      let fileKey = obj.Key;
      obj.Url = bucketUrl + encodeURIComponent(fileKey);
      return obj; }
  );



  folders = folders.map(
    (folder) => { folder.Name = decodeURIComponent(folder.Prefix.replace(prefix, "")); return folder; }
  );

  message = folders.length
  ? "Click a folder to view its contents." : "No folders found.";

  
  return { folders, files, message };
};




function S3Desktop(config) {
  this.client = null;
  this.region = config.region;
  this.identityPoolId = config.identityPoolId;
  this.bucket = config.bucket;
  this.currentFolder = null;

  this.client = new S3Client({
    region: this.region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: this.region }),
      identityPoolId: this.identityPoolId
    })
  });
}

let proto = {
  ls: ls
};

S3Desktop.prototype = proto;


exports.S3Desktop = S3Desktop;