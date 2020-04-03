# Flask Carpark

Carpark monitoring system

## Requirements
```
Flask
Flask-Migrate
Flask-SocketIO
Flask-SQLAlchemy
eventlet
psycopg2
gunicorn
python-dotenv
paho-mqtt
SQLAlchemy
```

## Installation

```
# This step is optional if you're not prefered virtualenv
$ python3 -m pip install virtualenv # in case you don't have
$ python3 -m virtualenv --python=python3 venv
$ source venv

# Start here
(venv) $ git clone https://github.com/phondanai/flask-carpark
(venv) $ cd flask-carpark
(venv) $ pip install -r requirements.txt
(venv) $ flask db upgrade
```

## Configuration
Create `.env` file and create your own configuration
```
SECRET_KEY="youneverknow"
SQLALCHEMY_DATABASE_URI=""
MQTT_BROKER_URL="mqtt.netpie.io"
MQTT_BROKER_PORT=1883
MQTT_CLIENT_ID="your mqtt client id"
MQTT_TOKEN="your mqtt token"
```

## Run
```
(venv) $ gunicorn --worker-class eventlet -w 1 application:app
```

## Running test
```
$ python tests.py
```

## Deploy
You need [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql).
And config your environment variable according to your `.env` file.
```
$ heroku config:set SECRET_KEY="youneverknow"
$ heroku config:set MQTT_BROKER_URL="mqtt.netpie.io"
$ # ... and so on
```

Then deploy
```
$ git push heroku master
```
## Hardware Testcase

Test case: VL53L0X module
Discription: Verify that VL53L0X module is work properly

Test procedure:	
      1. activate the sensor.
	2. change the distance.
	3. check the value from sensor.
      
Test data/device: the values from sensor.
      
Expected results: the value from sensor will be changed, when the distance change. 
Actual results: Sensor return a random value when object is out of range(2m).
*************************************************************************************************************
Test case: Mqtt
Discription: To send message through mqtt. 
Test procedure:	1. Read data from sensor.
		2. Publish by mqtt.
		3. Use MQTTBox to subscibe.
		4. Check message.
Test data/device: The values from sensor.
Expected results: Recieve a correct message(distance) in MQTTBox.


**************************************************************************************************************
## Data Analytic Testcase

Test case: Check_Generated_Data-001
Description: Check whether the generated data is exist or can be download and readable from data source. 

Prerequisites: <br/>
      1. User Authorization<br/>
      2. Web-page Avaliable <br/>

Test Procedure:<br/>
      1. Enter website <br/>
      2. Show report data<br/>

Test data: Generated Data from database <br/>

Expected results:The report of data should be appeared in web page <br/>

Actual result: -

**************************************************************************************************************

Test case: Test_Format-001 <br/>

Description:Validation of the data type,data length and schema format associated with this format<br/>
                
Floor_Slot   |	Status   	   |  Date-time    
-------------|--------------------|-------------------
F3_22	     |   Occupied	   |  1/12/2020 9:58:00
F2_10	     |   Available         |  1/13/2020 10:58:00
  
Prerequisites:<br/>
        1. User Authorization<br/>
        2. Web-page Avaliable<br/>

Test Procedure:<br/>
        1.Enter website<br/>
        2.Query data from website<br/>
        3.Validate format and data type whether they are correctly mapped or compatible with the specified format.<br/>

Test data: Generated Data from database <br/>

Expected results the data type and format of table should compatible with the format <br/>

Actual result: -

*************************************************************************************************************
# Parking Map
```
    Test case ID: Check the number of car had parking in each slots.
```
## Objective 
```
    To check the changing status of slots over a selected time period.
    The changing status : Available to Occupied parking.
```
## Procedure
```
    1. To load data.
    2. To select time period and the result should be show the number of changing status. 
    3. To check the result of counting method with the raw data. 
```
## Expected result
```
  When you selected time period such as 1.00 - 3.00 pm. 
  The result should be show number of changing status of slot.
  Therefore, we know the number of car that parked in here.
```
*************************************************************************************************************

# Cloud and Server Test Case

## Test Case: 
      Server Test

## Description: 
      To have the data from the device for observing pattern on cloud server and export that data as csv file

## Procedure: 
      (1) To subscribe the MQTT Broker (netpie.io) to know the information of parking slot availability 
      (2) Export data as csv file for data analysis part.

 ## Test Data: 
      Raw data 3x25 = 75 slots
      Storage require/1 year 700MB (Raw) & 50 MB (compressed)

 ## Expected Results:
      .csv file of observing pattern (daily/weekly/yearly) for data analytic part
      
      
      
     

## Test case:
   	Dashboard page

## Description
	Dashboard is page for display occupancy map. It shows status of slot that available or occupied.

## Procedure
	(1) To send request from dashboard page to server for download the data
	(2) To display data on dashboard page

## Test data
	To send request to server ([get])

## Expected results
	To receive .csv file from server
	To display occupancy map that available and occupied

