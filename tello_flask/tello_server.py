from flask import Flask, request, render_template, jsonify, Response
from djitellopy import Tello
from pyngrok import ngrok
import requests
import cv2
import time


PORT_NO = 8080 ## Port you want to host.
PUBLIC_URL = True  ## Set this to true if you want to host via ngrok. False = Only accessible from local network (You need a ngrok account)
distance = 70 ## The distance drone will move in cm.

app = Flask(__name__)

tello = Tello()

def get_info():
    data = {}

    data["Battery"] = tello.get_battery()
    data["Temperature"] = tello.get_temperature()
    data["Flight Time"] = tello.get_flight_time()
    data["Height"] = tello.get_height()

    return data

@app.route('/', methods=['GET'])
def home():
    try:
        data = get_info()
        
        return render_template("index.html", data=data)
    except:
        return render_template("connect.html")
    
@app.route('/get_info', methods=['GET'])
def info():
    try:
        data = get_info()

        return jsonify(data)
    except:
        return jsonify({})

@app.route('/connect', methods=['GET'])
def connect_drone():
    tello.connect()
    tello.streamon()

    return "ok"

@app.route('/take_off', methods=['GET'])
def take_off():
    tello.takeoff()
    return "ok"

@app.route('/land', methods=['GET'])
def land():
    tello.land()
    return "ok"

@app.route('/move', methods=['GET'])
def move_drone():
    direction = request.args.get('direction')

    match direction:
        case "up":
            tello.move_up(distance)
        case "down":
            tello.move_down(distance)
        case "forward":
            tello.move_forward(distance)
        case "back":
            tello.move_back(distance)
        case "left":
            tello.move_left(distance)
        case "right":
            tello.move_right(distance)
    return "ok"

@app.route('/flip', methods=['POST', 'GET'])
def flip():
    direction = request.args.get('direction')

    match direction:
        case "forward":
            tello.flip_forward()
        case "back":
            tello.flip_back()
        case "left":
            tello.flip_left()
        case "right":
            tello.flip_right()
    return "ok"

@app.route('/rotate', methods=['POST', 'GET'])
def rotate():
    direction = request.args.get('direction')
    match direction:
        case "left":
            tello.rotate_counter_clockwise(90)
        case "right":
            tello.rotate_clockwise(90)
    return "ok"

def gen_frames():
    while True:
        try:
            frame = tello.get_frame_read().frame  # read the camera frame
            frame = cv2.resize(frame, (360, 240))
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result
            time.sleep(1 / 16)
        except:
            pass

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

def start_ngrok():
    url = ngrok.connect(PORT_NO).public_url
    print(" * Public URL: ", url)

if PUBLIC_URL:
    start_ngrok()

if __name__ == '__main__':
    app.run(port=PORT_NO, host='0.0.0.0')
