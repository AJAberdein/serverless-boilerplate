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
 * Create a new document in dynamodb
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 * 
 * @returns {Object}
 * 
 * @example
 * {
 *  "name": "My document"
 *  "description": "My document description"
 * }
 * 
 */
const handler = async (event, context, callback) => {
    const { name, description } = JSON.parse(event.body);
    const document = {
        id: AWS.util.uuid.v4(),
        name,
        description,
        createdAt: new Date().toISOString(),
    };

    /**
     * Put document item into dynamodb
     */
    const result = await dynamoDb.put({
        TableName: DYNAMO_TABLE_DOCUMENTS,
        Item: document,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

module.exports = { handler };
