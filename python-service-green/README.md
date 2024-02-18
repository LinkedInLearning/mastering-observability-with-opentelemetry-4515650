# Install Dependencies
pip3 install opentelemetry-distro

# Run Boostrapper
opentelemetry-bootstrap -a install

# Install Flask Instrumentation
pip3 install opentelemetry-instrumentation-flask

# Start Service with OTel Agent
opentelemetry-instrument --traces_exporter console --metrics_exporter none --logs_exporter none --service_name service-green flask run --port 3010