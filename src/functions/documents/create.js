import aws from "aws-sdk";
import middy from "@middy/core";
import httppJsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";
import httpErrorHandler from "@middy/http-error-handler";
import dynamo from "../../modules/dynamo";

const DYNAMO_TABLE_DOCUMENTS =
  process.env.DYNAMO_TABLE_DOCUMENTS || "documents";

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
const handler = async (event) => {
  const { name, description } = event.body;
  const document = {
    id: aws.util.uuid.v4(),
    name,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  /**
   * Put document item into dynamodb
   */
  await dynamo.put(document, DYNAMO_TABLE_DOCUMENTS);

  return {
    statusCode: 200,
    body: JSON.stringify(document),
  };
};

const schema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["name", "description"],
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
