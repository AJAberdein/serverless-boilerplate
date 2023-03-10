"use strict";

const dynamo = require('../../modules/dynamo');
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
    const result = await dynamo.update({
        TableName: DYNAMO_TABLE_DOCUMENTS,
        Key: { id },
        UpdateExpression: "set #name = :name, #description = :description, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#name": "name",
            "#description": "description",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":description": description,
            ":updatedAt": new Date().toISOString(),
        },
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

module.exports = { handler };
