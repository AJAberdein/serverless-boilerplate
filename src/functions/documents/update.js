"use strict";

import dynamo from '../../modules/dynamo';

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
export const handler = async (event, context, callback) => {
    const { id } = event.pathParameters;
    const { name, description } = JSON.parse(event.body);

    let params = {}
    if (name) params.name = name
    if (description) params.description = description

    const result = await dynamo.update(
        id,
        params,
        DYNAMO_TABLE_DOCUMENTS
    );

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}