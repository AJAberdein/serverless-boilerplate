import middy from "@middy/core";
import httppJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { Logger, injectLambdaContext } from "@aws-lambda-powertools/logger";
import { Tracer, captureLambdaHandler } from "@aws-lambda-powertools/tracer";
import {
  Metrics,
  MetricUnits,
  logMetrics,
} from "@aws-lambda-powertools/metrics";
import dynamo from "../../modules/dynamo";

const DYNAMO_TABLE_DOCUMENTS =
  process.env.DYNAMO_TABLE_DOCUMENTS || "documents";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "documents-api",
});

const tracer = new Tracer({
  serviceName: "documents-api",
});

const metrics = new Metrics({
  namespace: "serverlessDocuments",
  serviceName: "documents-api",
});

/**
 * Read documents in dynamodb
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 *
 * @returns {Object}
 *
 */
const handler = async () => {
  
  logger.info('on start documents read handler');

  /**
   * Scan document items in dynamodb
   */
  const result = await dynamo.scan({
    TableName: DYNAMO_TABLE_DOCUMENTS,
  });

  metrics.addMetric("successfulReadDocuments", MetricUnits.Count, 1);

  logger.info('on done documents read handler');

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

export default middy(handler)
  .use(httppJsonBodyParser())
  .use(httpErrorHandler())
  .use(injectLambdaContext(logger))
  .use(captureLambdaHandler(tracer))
  .use(logMetrics(metrics));
