const dot = require("dotenv/config");
const fs = require('fs');
const AWS = require('aws-sdk');
const tableName = process.env.AWS_TABLE_NAME;
const awsConfig = {
    "region": process.env.AWS_REGION,
    "endpoint": process.env.AWS_ENDPOINT,
    "accessKeyId": process.env.AWS_ACCESSKEYID, 
    "secretAccessKey": process.env.AWS_SECRETKEY
};
AWS.config.update(awsConfig);
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = async (req, res) => {

    try {
        const baseDbParams = {
            TableName: tableName,
        };
    
        let data = await docClient.scan(baseDbParams).promise();
        let databaseItems = [...data.Items];
    
        // scan maxes out at 1MB of data. continue scanning if there is more data to read
        while (typeof data.LastEvaluatedKey !== 'undefined') {
        console.log('Scanning for more...');
        const params = {
            ...baseDbParams,
            ExclusiveStartKey: data.LastEvaluatedKey,
        };
        data = await docClient.scan(params).promise();
        databaseItems = [...databaseItems, ...data.Items];
        }

        //console.log('all databaseItems: ', JSON.stringify(databaseItems));
        res.status(200).json(databaseItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
