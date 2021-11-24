import os
import flask
from . import main

@main.route("/", methods=["GET"])
def index():
    return '''<h1>Test API for Software engineering</h1>
<p>Frost's stupid code</p>'''

@main.route("/api/dishes_management/types/all", methods = ["GET"])
def queryAllDishesType():
    '''Get dishes type by ID'''
    #https://stackoverflow.com/questions/21133976/flask-load-local-json
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    typeList = flask.json.load(open(jsonUrl, "r"))
    return flask.jsonify(list(typeList.values()))

@main.route("/api/dishes_management/types", methods = ["GET"])
def queryDishesType():
    '''Get dishes type by ID'''

    id = flask.request.args.get("id")
    if (id == None):
        return flask.Response("Invalid syntax, please specify an id", status=400)

    #https://stackoverflow.com/questions/21133976/flask-load-local-json
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    typeList = flask.json.load(open(jsonUrl, "r"))

    if id in typeList:
        return flask.jsonify(typeList[id])
    else:
        return flask.Response("Can't find the specified type", status=404)

@main.route("/api/dishes_management/dishes", methods = ["GET"])
def queryAllDishes():
    id = flask.request.args.get("id")
    if (id == None):
        return flask.Response("Invalid syntax, please specify an id", status=400)

    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "foods.json")
    foodList = flask.json.load(open(jsonUrl, "r", encoding='utf8'))
    if id in foodList:
        return flask.jsonify(foodList[id])
    else:
        return flask.Response("Can't find the specified dishes", status=404)