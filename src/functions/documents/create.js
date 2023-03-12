"use strict";

const AWS = require('aws-sdk');
const dynamo = require('../../modules/dynamo');
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
    const result = await dynamo.put(
        document,
        DYNAMO_TABLE_DOCUMENTS
    );

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

module.exports = { handler };
