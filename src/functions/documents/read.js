"use strict";

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const DYNAMO_TABLE_DOCUMENTS = process.env.DYNAMO_TABLE_DOCUMENTS || 'documents';

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
