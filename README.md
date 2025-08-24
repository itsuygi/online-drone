# online-drone
A DJI Tello drone control panel which can accessable publicly via ngrok.
## Setup
### Required packages: flask, djitellopy, pyngrok, cv2
1. Connect your tello to your computer using WiFi.
2. Run the flask server.
3. Go to the link outputed on console.

## Public url (ngrok)
### You can access your local server via ngrok url. This allows you to control your drone without being connected to your WiFi (outside home).

1. Create a ngrok account: https://dashboard.ngrok.com/signup
2. Download ngrok from the dashboard.
3. Follow the steps on ngrok dashboard. (get your authkey, set it on your console)
4. And your ngrok is setted up! Don't forget to download *pyngrok* plugin to use it on python.

## How to use
To use the panel, open the url. Connect your drone, and click connect. After your server connects with your drone, you can see the live video feed and control the drone.

### Features:
1. Auto takeoff and land
2. Moving forward, backward, left, right, up or down
3. Rotating left or right
4. Flipping to all directions
5. Info about battery, temperature, flight time and height
6. Live video feed from the drone camera

### Thank your for reading!
