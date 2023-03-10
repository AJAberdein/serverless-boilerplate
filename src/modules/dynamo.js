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
     * Get items in dynamodb
     */
    get: async (params) => {
        return await dynamoDb.get(params).promise();
    },

    /**
     * Query items in dynamodb
     */
    query: async (params) => {
        return await dynamoDb.scan(params).promise();
    },

    /**
     * Scan items in dynamodb
     */
    scan: async (params) => {
        return await dynamoDb.scan(params).promise();
    },

    /**
     * Put items in dynamodb
     */
    put: async (params) => {
        return await dynamoDb.put(params).promise();
    },

    /**
     * Update items in dynamodb
     */
    update: async (params) => {
        return await dynamoDb.update(params).promise();
    },

    /**
     * Delete items in dynamodb
     */
    delete: async (params) => {
        return await dynamoDb.delete(params).promise();
    },

}

module.exports = client;
