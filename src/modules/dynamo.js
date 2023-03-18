const AWS = require("aws-sdk");

const dev = {
  region: "localhost",
  endpoint: "http://localhost:8000",
};
const prod = { region: process.env.REGION || "eu-west-1" };
const config = process.env.IS_OFFLINE ? dev : prod;

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
      Key: { id },
    };
    const result = await dynamoDb.get(params).promise();

    return result;
  },

  /**
   * Raw query in dynamodb
   *
   * @param {Object} params
   *
   * @returns {Promise<Object>}
   */
  query: async (params) => {
    const result = await dynamoDb.scan(params).promise();

    return result;
  },

  /**
   * Raw scan items in dynamodb
   *
   * @param {Object} params
   *
   * @returns {Promise<Object>}
   */
  scan: async (params) => {
    const result = await dynamoDb.scan(params).promise();

    return result;
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
    const result = await dynamoDb.put(params).promise();

    return result;
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
      UpdateExpression: "set ",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: "ALL_NEW",
    };

    Object.keys(attributes).forEach((key, index) => {
      params.UpdateExpression += `#${key} = :${key}${
        index < Object.keys(attributes).length - 1 ? ", " : ""
      }`;
      params.ExpressionAttributeNames[`#${key}`] = `${key}`;
      params.ExpressionAttributeValues[`:${key}`] = attributes[key];
    });
    const result = await dynamoDb.update(params).promise();

    return result;
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
      ReturnValues: "ALL_OLD",
    };
    const result = await dynamoDb.delete(params).promise();

    return result;
  },
};

export default client;
