"use strict";

const AWS = require('aws-sdk');

const dev = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
};
const prod = { region: process.env.REGION || 'eu-west-1' };
const config = process.env.IS_OFFLINE ? dev : prod

const dynamoDb = new AWS.DynamoDB.DocumentClient(config);

const client = {

    /**
     * Get item in dynamodb by primary key
     * 
     * @param {String} id
     * @param {String} table
     * 
     * @returns {Promise<Object>}
     */
    get: async (id, table) => {

        const params = {
            TableName: table,
            Key: { id }
        };

        return await dynamoDb.get(params).promise();
    },

    /**
     * Raw query in dynamodb
     * 
     * @param {Object} params
     * 
     * @returns {Promise<Object>}
     */
    query: async (params) => {

        return await dynamoDb.scan(params).promise();

    },

    /**
     * Raw scan items in dynamodb
     *
     * @param {Object} params
     * 
     * @returns {Promise<Object>}
     */
    scan: async (params) => {

        return await dynamoDb.scan(params).promise();

    },

    /**
     * Put item in dynamodb
     * 
     * @param {Object} item
     * @param {String} table
     * 
     * @returns {Promise<Object>}
     */
    put: async (item, table) => {

        const params = {
            TableName: table,
            Item: item,
        };

        return await dynamoDb.put(params).promise();
    },

    /**
     * Update item in dynamodb
     * 
     * @param {String} id
     * @param {Object} item
     * @param {String} tableName
     * 
     * @returns {Promise<Object>}
     */
    update: async (id, attributes, tableName) => {
        const params = {
            TableName: tableName,
            Key: { id },
            UpdateExpression: 'set ',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
            ReturnValues: 'ALL_NEW',
        };

        Object.keys(attributes).forEach((key, index) => {
            params.UpdateExpression += `#${key} = :${key}${index < Object.keys(attributes).length - 1 ? ', ' : ''}`;
            params.ExpressionAttributeNames[`#${key}`] = `${key}`;
            params.ExpressionAttributeValues[`:${key}`] = attributes[key];
        });

        return await dynamoDb.update(params).promise();
    },

    /**
     * Delete item in dynamodb
     * 
     * @param {String} key
     * @param {String} table
     * 
     * @returns {Promise<Object>}
     */
    delete: async (id, table) => {

        const params = {
            TableName: table,
            Key: { id },
            ReturnValues: "ALL_OLD"
        };

        return await dynamoDb.delete(params).promise();
    },

}

export default client;