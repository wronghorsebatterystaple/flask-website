from flask import Blueprint

blueprint_name = "blog"
bp = Blueprint(blueprint_name, __name__, template_folder="templates/", static_folder="static/")

from . import routes
