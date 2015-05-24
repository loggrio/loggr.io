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

void flashGreen() {
  ledColorSet(0x00,0xff,0x00);
  delay(150);
  ledColorSet(0x00,0x00,0x00);
  delay(100);
  ledColorSet(0x00,0xff,0x00);
  delay(150);
  ledColorSet(0x00,0x00,0x00);
  delay(10);
}

void flashRed() {
  ledColorSet(0xff,0x00,0x00);
  delay(150);
  ledColorSet(0x00,0x00,0x00);
  delay(100);
  ledColorSet(0xff,0x00,0x00);
  delay(150);
  ledColorSet(0x00,0x00,0x00);
  delay(10);
}

int main(int argc, const char *argv[])
{
  if (argc != 2) {
    printf("Usage: ./rgb.out <error-code>\n");
    return 1;
  }

  if(wiringPiSetup() == -1) {
    printf("setup wiringPi failed!");
    return 2;
  }

  ledInit();

  if (strcmp(argv[1], "ok") == 0) {
    flashGreen();
  }
  else if ((strcmp(argv[1], "client_error") == 0) || (strcmp(argv[1], "server_error") == 0)) {
    flashRed(argv[1]);
  }

  return 0;
}
