const AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    try {
        let data = await cognito_idp.listUsers({
            UserPoolId: process.env.UserPoolId_cognitok,
            Limit: 10
        }).promise();

    } catch (err) {
        // error handling goes here
    };

    return { "message": "Successfully executed" };
};