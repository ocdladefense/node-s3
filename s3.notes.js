/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
    SPDX-License-Identifier: Apache-2.0

    ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
    https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-photos-view.html

    Purpose:
    s3_PhotoViewer.js demonstrates how to allow viewing of photos in albums stored in an Amazon S3 bucket.

    Inputs (replace in code):
    - REGION
    - BUCKET_NAME

    Running the code:
    ts-node s3_PhotoViewer.js





/*
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:a6fa4161-c0bc-41c6-bed8-beef92418624',
});
*/




/*
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:a6fa4161-c0bc-41c6-bed8-beef92418624',
});


npm install @aws-sdk/client-cognito-identity
npm install @aws-sdk/client-s3
npm install @aws-sdk/credential-provider-cognito-identity


webpack --entry polly.js --mode development --target web --devtool false -o main.js
webpack --entry s3.js --mode development --target web --devtool false -o main.js
*/


