from flask import Flask, request, jsonify
from diabetes import load_model, make_prediction
from heart_disease import load_model as load_heart_model,make_prediction as heart_prediction
from parkinsons import load_model as parkinsons_load_model, make_prediction as parkinsons_prediction
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


model, scaler, encoder = load_model()
heart_model,heart_scaler = load_heart_model()
parkinsons_model,parkinsons_scaler = parkinsons_load_model()

@app.route('/')
def home():
    return "Health Prediction API"

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    if request.method == 'POST':
        try:
          
            data = request.get_json(force=True)
            user_input = data['input']
            
            
            prediction = make_prediction(model, scaler, encoder, user_input)
            
           
            return jsonify({
                'prediction': int(prediction[0]),
                'message': 'The person has diabetes' if prediction[0] == 1 else 'The person does not have diabetes'
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 400

@app.route('/predict_heart_disease',methods=['POST'])
def predict_heart_disease():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            user_input = data['input']
            prediction = heart_prediction(heart_model,heart_scaler,user_input)
            return jsonify({
                'prediction': int(prediction[0]),
                'message': 'The person has heart disease' if prediction[0]==1 else 'The person does not have heart disease'
            })
        except Exception as e:
            return jsonify({'error': str(e)}),400

@app.route('/predict_parkinsons',methods = ['POST'])
def predict_parkinsons():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            user_input = data['input']
            prediction = parkinsons_prediction(parkinsons_model,parkinsons_scaler,user_input)
            return jsonify({
                'prediction':int(prediction[0]),
                'message':'The person has Parkinsons' if prediction[0]==1 else 'The person does not have Parkinsons'
            
            })
        except Exception as e:
            return jsonify({'error':str(e)}),400


if __name__ == '__main__':
    app.run(debug=True)
