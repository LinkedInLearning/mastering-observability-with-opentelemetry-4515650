from flask import Flask, request, jsonify
from opentelemetry.instrumentation.flask import FlaskInstrumentor
import requests

import time
import psutil
from opentelemetry import metrics

meter = metrics.get_meter(__name__)

def memory_usage_callback(options):
    print("Observing gauge")
    memory_usage = psutil.Process().memory_info().rss
    yield metrics.Observation(memory_usage)

memory_usage = meter.create_observable_gauge(
    "gateway_memory_usage",
    callbacks=[memory_usage_callback],
    unit="bytes",
    description="Memory usage of the Python Gateway"
)

api_duration = meter.create_gauge("gateway_api_duration", unit="ms")

app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)
toggle = 0

@app.route('/')
def index():
    global toggle
    choice = request.args.get('choice', '')
    url = f"http://localhost:{'3010' if toggle < 3 else '3020'}?choice={choice}"

    try:
        start_time = time.time()
        response = requests.get(url)
        duration = time.time() - start_time
        api_duration.set(duration, {"choice": choice})
        # Increment or reset the toggle based on its current value
        toggle = toggle + 1 if toggle < 3 else 0
        if response.status_code > 299:
            # If there is an error with the request, respond with the error
            return jsonify(error='Something went wrong!'), response.status_code
        # Return the JSON response from the request
        return response.json()
    except requests.exceptions.RequestException as e:
        # Handle connection errors
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
