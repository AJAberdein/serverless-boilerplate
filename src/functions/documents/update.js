import middy from "@middy/core";
import httppJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import httpErrorHandler from "@middy/http-error-handler";
import dynamo from "../../modules/dynamo";

const DYNAMO_TABLE_DOCUMENTS =
  process.env.DYNAMO_TABLE_DOCUMENTS || "documents";

/**
 * @description Update a document in dynamodb by id
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 *
 * @returns {Object}
 *
 */
const handler = async (event) => {
  const { id } = event.pathParameters;
  const { name, description } = event.body;

  const params = {};
  if (name) params.name = name;
  if (description) params.description = description;

  params.updatedAt = new Date().toISOString();

  const result = await dynamo.update(id, params, DYNAMO_TABLE_DOCUMENTS);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

const schema = {
  type: "object",
  required: ["body"],
  properties: {
    pathParameters: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
      },
    },
  },
};

export default middy(handler)
  .use(httppJsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(schema) }))
  .use(httpErrorHandler());
