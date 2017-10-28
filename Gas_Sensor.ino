#include <Servo.h>

int gasDigitalIn = 2;
int gasAnalogIn = A0;
int analogReadValue;
Servo myServo;
int servoOutPin = 9;
int SERVO_CUTOFF = 500;
int SERVO_HIGH = 170;
int SERVO_LOW = 10;
int HALF_SECOND = 500;
void setup()
{
  pinMode(gasDigitalIn, INPUT);
  pinMode(gasAnalogIn, INPUT);
  myServo.attach(servoOutPin);
  myServo.write(SERVO_LOW);
  Serial.begin(9600);
}
void loop()
{
  analogReadValue = analogRead(gasAnalogIn);
  Serial.println(analogReadValue);

  if (analogReadValue > SERVO_CUTOFF)
  {
    myServo.write(SERVO_HIGH);
  }
  if (analogReadValue < SERVO_CUTOFF)
  {
    myServo.write(SERVO_LOW);
  }
  /*
    if(digitalRead(gas_din)==LOW)
    {
      Serial.println(ad_value);
      (servoOut, 1023);
    }
    else
    {
      Serial.println("Gas not leak");
    }
  */
  delay(HALF_SECOND);
}
