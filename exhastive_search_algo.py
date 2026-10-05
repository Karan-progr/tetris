from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

def process(states):
    bestState = states[0]
    maxiscore = float('-inf')
    for state in states:
        world = np.array (state['world'])
        
        #calculate height variance
        variance = np.mean(np.var(world, axis=0))

        #calculate no of blocks about to vanish
        vanishBocks = np.sum(np.any(world != 0, axis=1))

        score = -(variance*4/225) + 0*vanishBocks
        if (score > maxiscore):
            maxiscore = score
            bestState = state


    return bestState

@app.route('/state', methods=['GET', 'POST'])
def getWorld():
    if request.method == 'POST' or request.method == 'GET':
        data = request.json
        print(data)
        return jsonify({"status": "ok", "data":process(data)})

if __name__ == '__main__':
    app.run(debug=True)