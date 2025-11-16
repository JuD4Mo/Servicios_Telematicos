#!/usr/bin/env python3

import sys, logging

sys.path.insert(0, "/var/www/webapp")

from web.views import app as application

logging.basicConfig(stream=sys.stderr)
