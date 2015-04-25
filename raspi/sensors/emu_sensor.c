#include <stdlib.h>
#include <time.h>
#include <stdio.h>

#define HIGH 23000
#define LOW 20000

int main(int argc, char const *argv[]) {

  srand(time(NULL));
  int r = rand();

  int x = (rand()%(HIGH-LOW))+LOW;

  float y = (float) x / 1000.000f;

  fprintf(stdout, "%.3f", y);
  //fprintf(stderr, "%s", "Error!!");
  return 0;

}
