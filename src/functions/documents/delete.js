import middy from "@middy/core";
import httppJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import httpErrorHandler from "@middy/http-error-handler";
import dynamo from "../../modules/dynamo";

const DYNAMO_TABLE_DOCUMENTS =
  process.env.DYNAMO_TABLE_DOCUMENTS || "documents";

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
const handler = async (event) => {
  const { id } = event.pathParameters;

  /**
   * Delete document item in dynamodb
   */
  const result = await dynamo.delete(id, DYNAMO_TABLE_DOCUMENTS);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

const schema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
  },
  required: ["pathParameters"],
};

export default middy(handler)
  .use(httppJsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(schema) }))
  .use(httpErrorHandler());
