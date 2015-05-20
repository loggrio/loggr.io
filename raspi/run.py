#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

from raspi_loggr.loggr import main
from raspi_loggr.emu import main as emu_main

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--emu":
        emu_main()
    else:
        main()
