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

  // if data good return data, else return 255
  return(dat1==dat2) ? dat1 : 255;
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

  // if brightness sensor isn't connected to the Raspberry Pi analogVal == 0
  if(analogVal == 0)
  {
    delay(10);
    analogVal = get_ADC_Result();
    if(analogVal == 0){
      fprintf(stderr, "brightness sensor maybe not connected!");
      return 3;
    }
  }

  // error in get_ADC_Result() (dat1 != dat2)
  if(analogVal == 255)
  {
    delay(10);
    analogVal = get_ADC_Result();
    if(analogVal == 255) {
      fprintf(stderr, "dat1 != dat2");
      return 4;
    }
  }

  if(analogVal <= 210) {
    illum = 210 - analogVal;
  }
  else if(analogVal > 210) {
    illum = 0;
  }
  fprintf(stdout, "%d", illum);
  fflush(stdout);

  return 0;
}
