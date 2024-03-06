# Start Service with OTel Agent
opentelemetry-instrument --traces_exporter console --metrics_exporter none --logs_exporter none --service_name gateway flask run --port 3001