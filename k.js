const google = require('googleapis').google;
const _auth = require('./Authorizer');
const storage = google.storage('v1');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    try {
        let data = await cognito_idp.listUsers({
            UserPoolId: "us-east-1_mcdTV1jKi",
            Limit: 10
        }).promise();

    } catch (err) {
        // error handling goes here
    };

    try {
        let data = await s3.listObjects({
            Bucket: "qraldemo",
            MaxKeys: 10
        }).promise();

    } catch (err) {
        // error handling goes here
    };
    storage.objects.list({
        bucket: 'sample_gcs',
        maxResults: 10,
        prefix: ''
    })
        .then(response => {
            console.log(response.data);           // successful response
            /*
    
            WARNING: response.data.items will be missing altogether (instead of being empty) if there are no matches!  
    
            response.data = {
                "kind": "storage#objects",
                "items": [
                    {
                        "kind": "storage#object",
                        "id": "<bucket>/<object>/<timestamp>",
                        "selfLink": "https://www.googleapis.com/storage/v1/b/<bucket>/o/<object>",
                        "name": "<object>",
                        "bucket": "<bucket>",
                        "contentType": "<content-type>",
                        "timeCreated": "<yyyy-MM-ddTHH:mm:ss.###Z>",
                        "updated": "<yyyy-MM-ddTHH:mm:ss.###Z>",
                        "size": "<bytes>",
                        "md5Hash": "<hash>",
                        "metadata": {
                            "<key1>": "<val1>",
                            "<key2>": "<val2>"
                        },
                        "crc32c": "<crc>",
                        "etag": "<etag>"
                        // , ...
                    }
                    // , ...
                ]
            }
            */
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });


    return { "message": "Successfully executed" };
};