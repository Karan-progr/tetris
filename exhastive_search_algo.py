from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

def process(states):
    bestState = states[0]
    maxiscore = float('inf')
    for state in states:
        world = np.array (state['world'])

        #caclulate heights matrix
        heights = np.array([0]*10)
        for idx, col in enumerate(world.T):
            for i in range(5, 20):
                if(col[i] != 0):
                    heights[idx] = 20 - i
                    break

        print(heights)
        
        #calculate height variance
        variance = np.var(heights)

        #calculate no of blocks about to vanish
        vanishBocks = np.sum(np.all(world != 0, axis=1))

        score = variance - vanishBocks
        if (score < maxiscore):
            maxiscore = score
            bestState = state


    return bestState

@app.route('/state', methods=['GET', 'POST'])
def getWorld():
    if request.method == 'POST' or request.method == 'GET':
        data = request.json
        return jsonify({"status": "ok", "data":process(data)})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")