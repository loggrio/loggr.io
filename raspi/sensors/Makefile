#
# Makefile for raspi sensors
#

# Compiler
CC = gcc
# Compiler flags
CFLAGS = -Wall -lwiringPi

SRCS = $(wildcard *.c)

PROGS = $(patsubst %.c,%.out,$(SRCS))

all: $(PROGS)

%.out: %.c
	$(CC) $(CFLAGS) -o $@ $<
