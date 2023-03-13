"use strict";

import dynamo from '../../modules/dynamo';
import aws from 'aws-sdk';

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
export const handler = async (event, context, callback) => {
    const { name, description } = JSON.parse(event.body);
    const document = {
        id: aws.util.uuid.v4(),
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