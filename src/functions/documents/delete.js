"use strict";

import dynamo from '../../modules/dynamo';

const DYNAMO_TABLE_DOCUMENTS = process.env.DYNAMO_TABLE_DOCUMENTS || 'documents';

/**
 * Delete a document in dynamodb by id
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 * 
 * @returns {Object}
 * 
 * @example
 * {
 *  "id": "a56b31a3-0198-4f6b-8e8b-78e6c86a4147"
 * }
 * 
 */
export const handler = async (event, context, callback) => {
    const { id } = event.pathParameters;

    /**
     * Delete document item in dynamodb
     */
    const result = await dynamo.delete(
        id, 
        DYNAMO_TABLE_DOCUMENTS
    );

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}