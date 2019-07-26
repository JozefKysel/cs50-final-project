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
    data = request.get_json()
    userid = get_jwt_identity()
    cur = mysql.connection.cursor()
    recordExits = cur.execute("SELECT * FROM books WHERE user_id = %s AND title = %s AND author = %s", (userid, data['title'], data['author'],))
    if not recordExits:
        cur.execute("INSERT INTO books (user_id, rating, author, image, small_image, title, completed) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            ,(userid, data['rating'], data['author'], data['image'], data['smallImage'], data['title'], False,))
        mysql.connection.commit()
        cur.close()
        return make_response('created', 201)
    cur.close()
    return make_response('record already exists', 204)

@app.route('/mybooks')
@jwt_required
def findmybooks():
    userid = get_jwt_identity()
    completed = request.args.get('q')
    cur = mysql.connection.cursor()
    if completed == 'true':
        cur.execute("SELECT * FROM books WHERE user_id = %s AND completed = True", (userid,))
    elif completed == 'false':
        cur.execute("SELECT * FROM books WHERE user_id = %s AND completed = False", (userid,))
    else:
        cur.execute("SELECT * FROM books WHERE user_id = %s", (userid,))
    data = cur.fetchall()
    mysql.connection.commit()
    cur.close()
    return make_response(jsonify(data), 200)

@app.route('/markasread', methods=['PUT'])
@jwt_required
def markasread():
    book = request.get_json()
    userid = get_jwt_identity()
    cur = mysql.connection.cursor()
    query = cur.execute("SELECT * FROM books WHERE user_id = %s AND title = %s AND author = %s", (userid, book['title'], book['author'],))
    if not query:
        cur.execute("INSERT INTO books (user_id, rating, author, image, small_image, title, completed) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            ,(userid, book['rating'], book['author'], book['image'], book['smallImage'], book['title'], True,))
    else:
        cur.execute("UPDATE books SET completed = True WHERE user_id = %s AND title = %s AND author = %s", (userid, book['title'], book['author'],))
    mysql.connection.commit()
    cur.close()
    return make_response('book status updated', 200)


if __name__ == '__main__':
    app.run(debug=True)
