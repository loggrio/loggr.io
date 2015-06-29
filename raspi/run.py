#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--emu":
        from raspi_loggr.emu import main as emu_main
        emu_main()
    elif len(sys.argv) > 1 and sys.argv[1] == "--config":
        from config_server.server import main as server_main
        server_main()
    else:
        from raspi_loggr.loggr import main
        main()
