# Command to start the OpenTelemetry Collector
docker run --rm --name otel-collector \
  -v ./collector-config.yml:/etc/otelcol-contrib/config.yaml \
  -p 1888:1888 \
  -p 8888:8888 \
  -p 8889:8889 \
  -p 13133:13133 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 55679:55679 \
  otel/opentelemetry-collector-contrib

# Ports
1888    pprof extension
8888    Prometheus metrics exposed by the Collector
8889    Prometheus exporter metrics
13133   health_check extension
4317    OTLP gRPC receiver
4318    OTLP http receiver
55679   zpages extension