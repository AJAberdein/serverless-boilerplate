"use strict";

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const DYNAMO_TABLE_DOCUMENTS = process.env.DYNAMO_TABLE_DOCUMENTS || 'documents';

/**
 * @description Update a document in dynamodb by id
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 * 
 * @returns {Object}
 * 
 */
const handler = async (event, context, callback) => {
    const { id } = event.pathParameters;
    const { name, description } = JSON.parse(event.body);

    /**
     * Update document item in dynamodb
     */
    const result = await dynamoDb.update({
        TableName: DYNAMO_TABLE_DOCUMENTS,
        Key: { id },
        UpdateExpression: "set #name = :name, #description = :description",
        ExpressionAttributeNames: {
            "#name": "name",
            "#description": "description",
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":description": description,
        },
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

module.exports = { handler };
