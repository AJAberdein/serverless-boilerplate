"use strict";

import dynamo from '../../modules/dynamo';

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
export const handler = async (event, context, callback) => {

    /**
     * Scan document items in dynamodb
     */
    const result = await dynamo.scan({
        TableName: DYNAMO_TABLE_DOCUMENTS,
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}