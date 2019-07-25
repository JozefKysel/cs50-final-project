from flask import Flask, request, make_response, jsonify, session
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity, get_raw_jwt)
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from xmljson import badgerfish as bf
from xml.etree.ElementTree import fromstring
import requests
from json import dumps

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'books'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = ''

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
mysql = MySQL(app)
CORS(app)

@app.route('/register', methods = ['POST'])
def register():
    username = request.get_json()['username']
    password = request.get_json()['password']
    email = request.get_json()['email']
    if not username or not password or not email:
        return make_response(jsonify('Invalid input'), 400)
    else:
        password = bcrypt.generate_password_hash(password);
    cur = mysql.connection.cursor()
    alreadyExists = cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    if not alreadyExists:
        cur.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password,))
        mysql.connection.commit()
        cur.close()
    else:
        return make_response(jsonify('User already exists'), 400)
    return make_response(jsonify('User created'), 201)

@app.route('/login', methods = ['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    if not username or not password:
        return make_response(jsonify('invalid input'), 400)
    else:
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        if result:
            data = cur.fetchone()
            hash = data['password']
            if bcrypt.check_password_hash(hash, password):
                access_token = create_access_token(identity = data['id'])
                return make_response(jsonify({'access_token': access_token}), 200)
            else:
                return make_response(jsonify('unauthorized'), 401)
        else:
            return make_response(jsonify('user does not exists'), 400)

@app.route('/search')
@jwt_required
def findbooks():
    key = ''
    params = request.args.get('q')
    try:
        response = requests.get('https://www.goodreads.com/search/index.xml?key=' + key + '&q=' + params)
        jsonresponse = bf.data(fromstring(response.content))
        return make_response(jsonresponse, 200)
    except:
        return make_response('api call error', 500)

@app.route('/booktoread', methods=['POST'])
@jwt_required
def savebook():
    print(request.get_json())
    return make_response('hi', 201)


if __name__ == '__main__':
    app.run(debug=True)
