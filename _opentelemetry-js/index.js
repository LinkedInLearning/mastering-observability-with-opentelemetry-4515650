const { NodeSDK } = require("@opentelemetry/sdk-node");

const {
  OTLPTraceExporter
} = require("@opentelemetry/exporter-trace-otlp-proto");

const {
  getNodeAutoInstrumentations
} = require("@opentelemetry/auto-instrumentations-node");

const { Resource } = require("@opentelemetry/resources");
const {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION
} = require("@opentelemetry/semantic-conventions");

module.exports = (serviceName, serviceVersion) => {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: serviceName,
      [SEMRESATTRS_SERVICE_VERSION]: serviceVersion
    }),
    traceExporter: new OTLPTraceExporter(),
    instrumentations: [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-fs": { enabled: false }
      })
    ]
  });

  sdk.start();
  return sdk;
};
