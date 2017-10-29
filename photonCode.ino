//Code to setup led ring
#include <neopixel.h>
#include "Particle.h"
#include "neopixel/neopixel.h"
#define PIXEL_PIN D4
#define PIXEL_COUNT 12
#define PIXEL_TYPE WS2812B
Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

//Servo Pins
Servo servoList[2];
#define servoOutPin0 D0
#define servoOutPin1 D1

//Ethanol Sensor Pins
int gasDigitalIn = 3;
int gasAnalogIn = A0;
int analogReadValue;

//Bool to know whether to open a box
bool openBox = false;

//Constants
#define SENSOR_MAX_IDLE 700
#define SENSOR_MAX_OPEN 1000
#define SERVO_OPEN 10
#define SERVO_CLOSED 170
#define NUM_MEASUREMENTS 12
#define MAX_MEASUREMENT_WAIT 12
#define HALF_SECOND 500

void setup()
{
    //Set pinmodes for ethanol sensor
    pinMode(gasDigitalIn, INPUT);
    pinMode(gasAnalogIn, INPUT);

    //Initialize servos to "open"
    
    servoList[0].attach(servoOutPin0);
    servoList[0].write(SERVO_OPEN);
    servoList[1].attach(servoOutPin1);
    servoList[1].write(SERVO_OPEN);
  
    //Sets up the Neopixel ring to start off
    strip.begin();
    strip.show();
    
    //Functions to be called by the webpage
    Particle.function("closeDoor",closeDoor);
    Particle.function("runSensor",runSensor);

    Serial.begin(9600);
}

void loop()
{

}

//Called by the webpage to lock a door with new key in it
int closeDoor(String servoIndexString)
{
    int servoIndex = atoi(servoIndexString);
    servoList[servoIndex].write(SERVO_CLOSED);
    return 0;
}

//Called by the webpage to test if door can be opened
int runSensor(String servoIndexString)
{
    waitForBreath();
    toggleServo(servoIndexString);
    
    delay(HALF_SECOND);
    LEDRingOff();
    openBox = false;
    return 0;
}

//In standby waiting for person to breath into device. Only take valid measurents 
//if above once measurement above min default state threshold taken
void waitForBreath()
{
    int waitingForMeasurement = 0;

    while(waitingForMeasurement < MAX_MEASUREMENT_WAIT)
    {
        analogReadValue = analogRead(gasAnalogIn);
        Serial.println(analogReadValue);
        
        if(analogReadValue < SENSOR_MAX_IDLE)
        {
            //Havent breathed into device yet, set LEDs yellow for standby
            setLEDYellow(waitingForMeasurement);
        }
        else if(analogReadValue > SENSOR_MAX_IDLE)
        {
            //Breathed into device, start real measurements after resetting LEDS
            LEDRingOff();
            takeMeasurements();
            return;
        }
        waitingForMeasurement += 1;
        delay(HALF_SECOND);
    }
    
    //Failed to breath into sensor
    setLEDRed();
}

//Takes measurements while person breathing into sensor, tests if they are within limits
void takeMeasurements()
{
    int measurementNum = 0;

     while(measurementNum < NUM_MEASUREMENTS)
    {
        analogReadValue = analogRead(gasAnalogIn);
        Serial.println(analogReadValue);
        setLEDGreen(measurementNum);

        if((analogReadValue > SENSOR_MAX_IDLE) && (analogReadValue < SENSOR_MAX_OPEN))
        {
            //Breathing in, acceptale level to open
            openBox = true;
        }
        if(analogReadValue > SENSOR_MAX_OPEN)
        {
            //Levels too high, don't open
            setLEDRed();
            openBox = false;
            break;
        }
        
        measurementNum += 1;
        delay(HALF_SECOND);
    }   
}

//Opens/closes servos based on result of breath sensor
void toggleServo(String servoIndexString)
{
    int servoIndex = atoi(servoIndexString);
    
    if (openBox == true)
    {
        Serial.println("OPEN");
        servoList[servoIndex].write(SERVO_OPEN);
    }
    else if (openBox == false)
    {
        Serial.println("CLOSED");
        servoList[servoIndex].write(SERVO_CLOSED);
    }
}

void LEDRingOff() {
    for (int i = 0; i<12; i++){
        strip.setPixelColor(i,0,0,0);
        strip.show();
    }
}

void setLEDRed()
{
    for (int i = 0; i<12; i++){
        strip.setPixelColor(i,10,0,0);
        strip.show();
    }
}

void setLEDGreen(int index)
{
    strip.setPixelColor(index,0,10,0);
    strip.show();
}

void setLEDYellow(int index)
{
    strip.setPixelColor(index,10,10,0);
    strip.show();
}

