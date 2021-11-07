import os
import flask

app = flask.Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return '''<h1>Test API for Software engineering</h1>
<p>Frost's stupid code</p>'''

@app.route("/api/dishes_management/types/all", methods = ["GET"])
def queryAllDishesType():
    '''Get dishes type by ID'''
    #https://stackoverflow.com/questions/21133976/flask-load-local-json
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    typeList = flask.json.load(open(jsonUrl, "r"))
    return flask.jsonify(typeList)


@app.route("/api/dishes_management/types", methods = ["GET"])
def queryDishesType():
    '''Get dishes type by ID'''

    id = flask.request.args.get("id")
    if (id == None):
        return flask.Response("Invalid syntax, please specify an id", status=400)
    else:
        id = int(id)

    #https://stackoverflow.com/questions/21133976/flask-load-local-json
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    typeList = flask.json.load(open(jsonUrl, "r"))

    for entry in typeList:
        if (entry["id"] == id):
            return flask.jsonify(entry)
    return flask.Response("Can't find the specified type",status=404)

app.run()

