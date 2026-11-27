# Command to start the Jaeger Docker container
docker run --rm --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 5317:4317 \
  -p 5318:4318 \
  jaegertracing/all-in-one:1.54

# Ports
5778	HTTP	agent	serve configs (sampling, etc.)
16686	HTTP	query	serve frontend
4317	HTTP	collector	accept OpenTelemetry Protocol (OTLP) over gRPC
4318	HTTP	collector	accept OpenTelemetry Protocol (OTLP) over HTTP