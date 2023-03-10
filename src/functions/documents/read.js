"use strict";

const AWS = require('aws-sdk');


// TODO: Refactor to DynamoDB module START

const dev = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
};

const prod = { region: process.env.REGION || 'us-east-1' };

const config = process.env.IS_OFFLINE ? dev : prod

console.log(config);

const dynamoDb = new AWS.DynamoDB.DocumentClient(config);

const DYNAMO_TABLE_DOCUMENTS = process.env.DYNAMO_TABLE_DOCUMENTS || 'documents';

// TODO: Refactor to DynamoDB module END


/**
 * Read documents in dynamodb
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 * 
 * @returns {Object}
 * 
 */
const handler = async (event, context, callback) => {

    /**
     * Scan document items in dynamodb
     */
    const result = await dynamoDb.scan({
        TableName: DYNAMO_TABLE_DOCUMENTS,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

module.exports = { handler };
