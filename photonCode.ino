//Code to setup led ring
#include <neopixel.h>
#include "Particle.h"
#include "neopixel/neopixel.h"
#define PIXEL_PIN D4
#define PIXEL_COUNT 12
#define PIXEL_TYPE WS2812B
#define LED_BRIGHTNESS 50
Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

//Servo Pins
Servo servoList[2];
#define servoOutPin0 D0
#define servoOutPin1 D1

//LED Pins, list format: led0Green, led1Green, etc
#define LED_LIST_LENGTH 2
int ledListGreen[LED_LIST_LENGTH] = {A2, A4};
int ledListRed[LED_LIST_LENGTH] = {A3, A5};
#define ledOn LOW
#define ledOff HIGH


//Ethanol Sensor Pins
int gasDigitalIn = 3;
int gasAnalogIn = A0;
int analogReadValue;

//Bool to know whether to open a box
bool openBox = false;

//Constants
#define SENSOR_MAX_IDLE 1000
#define SENSOR_MAX_OPEN 1500
#define SERVO_OPEN 200
#define SERVO_CLOSED 130
#define NUM_MEASUREMENTS 12
#define MAX_MEASUREMENT_WAIT 12
#define HALF_SECOND 500

void setup()
{
    //Set pinmodes for ethanol sensor
    pinMode(gasDigitalIn, INPUT);
    pinMode(gasAnalogIn, INPUT);

    //Initialize servos to "closed"
    servoList[0].attach(servoOutPin0);
    servoList[0].write(SERVO_CLOSED);
    servoList[1].attach(servoOutPin1);
    servoList[1].write(SERVO_CLOSED);

    //Initialize LED pins to available green
    for(int i = 0; i < LED_LIST_LENGTH; i++)
    {
        pinMode(ledListGreen[i], OUTPUT);
        pinMode(ledListRed[i], OUTPUT);
        digitalWrite(ledListGreen[i], ledOn);
        digitalWrite(ledListRed[i], ledOff);
    }

    //Sets up the Neopixel ring to start off
    strip.begin();
    strip.show();

    //Functions to be called by the webpage
    Particle.function("openDoor", openDoor);
    Particle.function("closeDoor", closeDoor);
    Particle.function("lockAllDoors", lockAllDoors);
    Particle.function("runSensor", runSensor);

    Serial.begin(9600);
}

void loop()
{

}

//Called by the webpage to open a locked, available door to put key in
int openDoor(String servoIndexString)
{
    int servoIndex = atoi(servoIndexString);
    servoList[servoIndex].write(SERVO_OPEN);

    return 0;
}

//Called by the webpage to lock all doors, don't change LEDs
int lockAllDoors(String servoIndexString)
{
    servoList[0].write(SERVO_CLOSED);
    servoList[1].write(SERVO_CLOSED);

    return 0;
}

//Called by the webpage to lock a door with new key in it, set door LED red
int closeDoor(String servoIndexString)
{
    int servoIndex = atoi(servoIndexString);
    servoList[servoIndex].write(SERVO_CLOSED);

    digitalWrite(ledListGreen[servoIndex], ledOff);
    digitalWrite(ledListRed[servoIndex], ledOn);

    return 0;
}

//Called by the webpage to test if door can be opened
int runSensor(String servoIndexString)
{
    if(!waitForBreath())
    {
        delay(3*HALF_SECOND);
        LEDRingOff();
        openBox = false;
        return -1;
    }

    int isUnlocked = toggleServo(servoIndexString);

    delay(3*HALF_SECOND);
    LEDRingOff();
    openBox = false;
    return isUnlocked;
}

//In standby waiting for person to breath into device. Only take valid measurents
//if above once measurement above min default state threshold taken
bool waitForBreath()
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
            return true;
        }
        waitingForMeasurement += 1;
        delay(HALF_SECOND);
    }

    //Failed to breath into sensor
    setLEDRed();
    return false;
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
int toggleServo(String servoIndexString)
{
    int servoIndex = atoi(servoIndexString);

    if (openBox == true)
    {
        Serial.println("OPEN");
        servoList[servoIndex].write(SERVO_OPEN);
        digitalWrite(ledListGreen[servoIndex], ledOn);
        digitalWrite(ledListRed[servoIndex], ledOff);
        return 0;
    }
    else if (openBox == false)
    {
        Serial.println("CLOSED");
        servoList[servoIndex].write(SERVO_CLOSED);
        digitalWrite(ledListGreen[servoIndex], ledOff);
        digitalWrite(ledListRed[servoIndex], ledOn);
    }
    return 1;
}

// Turns on/off the LED ring that I use
void LEDRingOff() {
    for (int i = 0; i<12; i++){
        strip.setPixelColor(i,0,0,0);
        strip.show();
    }
}

// Sets an LED to red
void setLEDRed()
{
    for (int i = 0; i<12; i++){
        strip.setPixelColor(i,LED_BRIGHTNESS,0,0);
        strip.show();
    }
}

// Sets an LED to green
void setLEDGreen(int index)
{
    strip.setPixelColor(index,0,LED_BRIGHTNESS,0);
    strip.show();
}

//Sets an LED to yellow
void setLEDYellow(int index)
{
    strip.setPixelColor(index,LED_BRIGHTNESS,LED_BRIGHTNESS,0);
    strip.show();
}
