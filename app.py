from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import joblib

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Cargar los datos de recomendación al inicio del servidor
datamovies, similarity = joblib.load('movie_recommendation_system.pkl')

# Sistema de recomendación basado en similitud
def recommendation_system(movie):
    id_of_movie = datamovies[datamovies['movie_title'] == movie].index[0]
    distances = similarity[id_of_movie]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:15]
    recommended_movies = [datamovies.iloc[movie_id[0]].movie_title for movie_id in movie_list]
    return recommended_movies

# Ruta para obtener recomendaciones
@app.route('/recommend', methods=['GET'])
@cross_origin()
def recommend():
    movie_title = request.args.get('movie')
    recommendations = recommendation_system(movie_title)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
