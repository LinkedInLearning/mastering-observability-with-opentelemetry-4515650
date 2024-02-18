from flask import Flask, request, jsonify
import requests
import random

app = Flask(__name__)

toggle = 0

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

@app.route('/')
def index():
    global toggle
    choice = request.args.get('choice', '')
    url = f"http://localhost:{'3010' if toggle < 3 else '3020'}?choice={choice}"

    # Simulate slowdown on ~30% of the requests
    if random.random() < 0.3:
        fibonacci(35)  # This will cause a deliberate slowdown
        try:
            response = requests.get(url)
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
