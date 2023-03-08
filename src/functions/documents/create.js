"use strict";

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const DYNAMO_TABLE_DOCUMENTS = process.env.DYNAMO_TABLE_DOCUMENTS || 'documents';

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
    const { name, description } = event;
    const document = {
        id: AWS.util.uuid.v4(),
        name,
        description,
        createdAt: new Date().toISOString(),
    };

    /**
     * Create new document item in dynamodb
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
