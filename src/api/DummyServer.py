from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to generate random weather data
def generate_weather_details():
    weather_conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy", "Foggy"]
    cities = ["New York", "London", "Tokyo", "Mumbai", "Sydney", "Cairo"]

    return {
        "city": random.choice(cities),
        "temperature": round(random.uniform(-10, 40), 1),  # Temperature in Celsius
        "humidity": random.randint(10, 100),  # Humidity in percentage
        "condition": random.choice(weather_conditions),
        "wind_speed": round(random.uniform(0.5, 15.0), 1),  # Wind speed in km/h
    }

# Route to get weather details
@app.route('/weather', methods=['GET'])
def get_weather():
    weather_data = generate_weather_details()
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)
