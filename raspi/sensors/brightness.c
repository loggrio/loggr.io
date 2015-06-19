/*
*   brightness.c:
*   brightness sensor
*/

#include <wiringPi.h>
#include <stdio.h>

typedef unsigned char uchar;
typedef unsigned int uint;

#define     ADC_CS        0
#define     ADC_CLK       1
#define     ADC_DIO       2
#define     DATA_GOOD     1
#define     DATA_NOT_GOOD 2

int dataState = DATA_NOT_GOOD;

uchar get_ADC_Result()
{
  uchar i;
  uchar dat1 = 0, dat2 = 0;

  digitalWrite(ADC_CS, 0);
  digitalWrite(ADC_CLK, 0);
  digitalWrite(ADC_DIO, 1); delayMicroseconds(2);
  digitalWrite(ADC_CLK, 1); delayMicroseconds(2);

  digitalWrite(ADC_CLK, 0);
  digitalWrite(ADC_DIO, 1); delayMicroseconds(2);
  digitalWrite(ADC_CLK, 1); delayMicroseconds(2);

  digitalWrite(ADC_CLK, 0);
  digitalWrite(ADC_DIO, 0); delayMicroseconds(2);
  digitalWrite(ADC_CLK, 1);
  digitalWrite(ADC_DIO, 1); delayMicroseconds(2);
  digitalWrite(ADC_CLK, 0);
  digitalWrite(ADC_DIO, 1); delayMicroseconds(2);

  for(i = 0; i < 8; i++)
  {
    digitalWrite(ADC_CLK, 1); delayMicroseconds(2);
    digitalWrite(ADC_CLK, 0); delayMicroseconds(2);

    pinMode(ADC_DIO, INPUT);
    dat1 = dat1 << 1 | digitalRead(ADC_DIO);
  }

  for(i = 0; i < 8; i++)
  {
    dat2 = dat2 | ((uchar)(digitalRead(ADC_DIO))<<i);
    digitalWrite(ADC_CLK, 1); delayMicroseconds(2);
    digitalWrite(ADC_CLK, 0); delayMicroseconds(2);
  }

  digitalWrite(ADC_CS, 1);

  if(dat1 == dat2)
  {
    dataState = DATA_GOOD;
    return dat1;
  }
  else
  {
    dataState = DATA_NOT_GOOD;
    return 0;
  }

}

int main(void)
{
  uchar analogVal;
  uchar illum;

  // when initialize wiring failed, print message to screen
  if(wiringPiSetup() == -1){
    fprintf(stderr, "setup wiringPi failed!");
    return 1;
  }

  pinMode(ADC_CS,  OUTPUT);
  pinMode(ADC_CLK, OUTPUT);

  pinMode(ADC_DIO, OUTPUT);

  analogVal = get_ADC_Result();

  // most times when analogVal = 0 the brightness sensor isn't connected to the Raspberry
  if(analogVal == 0)
  {
    analogVal = get_ADC_Result();
    if(analogVal == 0){
      fprintf(stderr, "brightness maybe not connected!");
      return 3;
    }
  }

  if(analogVal <= 210 && dataState == DATA_GOOD)
  {
    illum = 210 - analogVal;
    fprintf(stdout, "%d", illum);
  }
  if (analogVal > 210 && dataState == DATA_GOOD)
  {
    illum = 0;
    fprintf(stdout, "%d", illum);
  }
  fflush(stdout);

  return 0;
}
