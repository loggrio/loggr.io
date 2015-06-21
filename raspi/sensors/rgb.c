#include <wiringPi.h>
#include <softPwm.h>
#include <stdio.h>
#include <string.h>

#define uchar unsigned char

#define LedPinRed    25
#define LedPinGreen  28
#define LedPinBlue   29

void ledInit(void)
{
  softPwmCreate(LedPinRed,  0, 100);
  softPwmCreate(LedPinGreen,0, 100);
  softPwmCreate(LedPinBlue, 0, 100);
}

void ledColorSet(uchar r_val, uchar g_val, uchar b_val)
{
  softPwmWrite(LedPinRed,   r_val);
  softPwmWrite(LedPinGreen, g_val);
  softPwmWrite(LedPinBlue,  b_val);
}

void flashLed(uchar r, uchar g, uchar b){
  ledColorSet(r, g, b);
  delay(150);
  ledColorSet(0x00,0x00,0x00);
  delay(100);
  ledColorSet(r, g, b);
  delay(150);
  ledColorSet(0x00,0x00,0x00);
  delay(10);
}

void flashGreen() {
  flashLed(0x00,0xff,0x00);
}

void flashOrange() {
  flashLed(0xff,0x66,0x00);
}

void flashRed() {
  flashLed(0xff,0x00,0x00);
}

void flashBlue() {
  flashLed(0xff,0x00,0xCC);
}

int main(int argc, const char *argv[])
{
  if (argc != 2) {
    printf("invalid arguments! Usage: ./rgb.out <error-code>\n");
    return 2;
  }

  if(wiringPiSetup() == -1) {
    printf("setup wiringPi failed!");
    return 1;
  }

  ledInit();

  if (strcmp(argv[1], "ok") == 0) {
    flashGreen();
  }
  else if (strcmp(argv[1], "request_error") == 0) {
    flashOrange();
  }
  else if (strcmp(argv[1], "sensor_broken") == 0) {
    flashRed();
  }
  else if (strcmp(argv[1], "pairing_succeeded") == 0) {
    flashBlue();
  }

  return 0;
}
