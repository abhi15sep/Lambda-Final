const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.fn = (event, context, callback) => {
    const params = {
        Item: {
            "UserId": {
                S: "dasf787af8safa"
            },
            "Age": {
                N: "28"
            },
            "Height": {
                N: "72"
            },
            "Income": {
                N: "2500"
            }
        },
        TableName: "compare-yourself"
    };
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log(data);
            callback(null, data);
        }
    });
};
