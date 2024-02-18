from flask import Flask, request, jsonify

from pymongo import MongoClient

app = Flask(__name__)

# MongoDB setup
uri = "mongodb://localhost"
client = MongoClient(uri)
db = client['voting']
votes = db['votes']

print(f"Running in: {__name__}")

@app.route("/", methods=['GET'])
def home():
    choice = request.args.get('choice', default=None, type=str)
    
    if choice == 'clear':
        votes.delete_many({})
    elif choice:
        votes.insert_one({'choice': choice})

    spaces_count = votes.count_documents({'choice': 'spaces'})
    tabs_count = votes.count_documents({'choice': 'tabs'})
            
    return jsonify({"spaces": spaces_count, "tabs": tabs_count})

if __name__ == "__main__":
    app.run(debug=True)
