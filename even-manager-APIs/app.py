from flask import Flask, request, jsonify
from flask_cors import CORS
from connection import get_connection

app = Flask(__name__)
CORS(app)   


@app.route('/user_authentication', methods=['POST'])
def user_auth():
    data = request.get_json()
    try: 
        with get_connection().cursor() as cursor:
            
            users = cursor.execute(""" SELECT id, email, password FROM [user] """).fetchall()

            verified = [user for user in users if data["email"] == user[1] and data["password"] == user[2]]
                
            if verified:
                user_id = verified[0][0]
                if data["email"] == "admin@gmail.com":
                    return jsonify({'status': 'success', 'message': 'Admin authenticated successfully', "user_id": user_id}), 205
                
                else:
                    return jsonify({'status': 'success', 'message': 'User authenticated successfully', "user_id": user_id}), 200 
            
            else: 
                return jsonify({'status': 'failed', 'message': 'Invalid email or password'}), 201
            
    except Exception as e:
        return jsonify({'status': 'failed', 'message': str(e)}), 201 
        
# ------------------- Admin APIs -------------------
    
@app.route('/new_event', methods=['POST'])
def add_a_new_event():
    data = request.get_json()
    try:
        with get_connection().cursor() as cursor:

            cursor.execute(""" INSERT INTO event (name, date, location, image) VALUES (?,?,?,?) """, (data['name'], data['date'], data['location'], data['image'])).commit()

            return jsonify({'status': 'success', 'message': 'New event added successfully'}), 200
        
    except Exception as e:
        return jsonify({'status': 'failed', 'message': str(e)}), 201
    
@app.route('/get_events', methods=['GET'])
def all_events():
    with get_connection().cursor() as cursor:

        data = cursor.execute(""" SELECT id, name, convert(varchar, date) as display_date, date, location, image FROM event """).fetchall()
        
        events = [{"id": event.id, "name": event.name, "countdown_date": event.date, "date": event.display_date, "location": event.location, "image": event.image} for event in data]
        
        return jsonify({'status': 'success', "data": events}), 200
    
@app.route('/get_data', methods=['GET'])
def get_data():
    with get_connection().cursor() as cursor:

        data = cursor.execute(""" SELECT * FROM admin """).fetchone()
        
        return jsonify({'status': 'success', "data": {"id": data[0], "username": data[1], "password": data[2]}})



# ------------------- User APIs -------------------
    
@app.route('/user_signup', methods=['POST'])
def new_user():
    data = request.get_json()
    try:
        with get_connection().cursor() as cursor:

            cursor.execute(""" INSERT INTO [user] (name, age, email, password) VALUES (?,?,?,?) """, (data['name'], data['age'], data['email'], data['password'])).commit()

            return jsonify({'status': 'success', 'message': 'User signed up successfully'}), 200
        
    except Exception as e:
        return jsonify({'status': 'failed', 'message': str(e)}), 201
    

@app.route('/get_users', methods=['GET'])
def all_users():
    with get_connection().cursor() as cursor:

        data = cursor.execute(""" SELECT * FROM [user] """).fetchall()
        
        users = [{"id": user.id, "name": user.name, "age": user.age, "email": user.email, "event_id": user.event_id} for user in data]
        
        return jsonify({'status': 'success', "data": users}), 200
    

@app.route('/rsvp', methods=['POST'])
def rsvp_for_event():
    data = request.get_json()
    try:
        with get_connection().cursor() as cursor:

            cursor.execute(""" INSERT INTO event_participation (user_id, event_id) VALUES (?,?) """, (data['user_id'], data['event_id'])).commit()

            return jsonify({'status': 'success', 'message': 'RSVP successful'}), 200
        
    except Exception as e:
        return jsonify({'status': 'failed', 'message': str(e)}), 201

@app.route('/save_comment', methods=['POST'])
def save_comment_to_db():
    data = request.get_json()
    try:
        with get_connection().cursor() as cursor:

            cursor.execute(""" select from event_participation where user_id = (?)""", data['user_id'])

            if cursor.fetchone() is None:
                
                return jsonify({'status': 'failed', 'message': 'User has not RSVPed for the event'}), 201
            
            else:
                cursor.execute(""" INSERT INTO comments (user_id, event_id, comment) VALUES (?,?,?) """, (data['user_id'], data['event_id'], data['comment'])).commit()

                return jsonify({'status': 'success', 'message': 'Comment saved successfully'}), 200 
        
    except Exception as e:
        return jsonify({'status': 'failed', 'message': str(e)}), 201
    
@app.route('/get_comments/<int:eventId>', methods=['GET'])
def get_comments(eventId):
    with get_connection().cursor() as cursor:

        data = cursor.execute(""" SELECT * FROM get_comments_by_event(?) """, eventId).fetchall()
        
        comments = [{"id": comment.id, "email": comment.email, "comment": comment.comment} for comment in data]
        
        return jsonify({'status': 'success', "data": comments}), 200
    

if __name__ == '__main__':
    app.run(debug=True)  