#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import subprocess
from raspi_loggr.util import init_config

if __name__ == "__main__":
    init_config()
    if len(sys.argv) > 1 and sys.argv[1] == "--emu":
        from raspi_loggr.emu import main as emu_main
        emu_main()
    else:
        from raspi_loggr.loggr import main
        main()
