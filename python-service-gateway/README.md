# Start Service with OTel Agent
opentelemetry-instrument --traces_exporter console --metrics_exporter none --logs_exporter none --service_name gateway flask run --port 3001

# Enable OTel Log Instrumentation

## Mac/Linux
export OTEL_PYTHON_LOG_CORRELATION=true
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true

## Windows
set OTEL_PYTHON_LOG_CORRELATION=true
set OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true