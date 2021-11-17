import os
import flask

clerk = flask.Blueprint('clerk', __name__)

@clerk.route('/api/menu_management/data/all', methods=["GET"])
def getListDishes():
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "data.json")
    dishes = flask.json.load(open(jsonUrl, "r"))
    
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl, "r"))

    dishes = [{**dish, "category" : type_dishes[type_id]["name"]} for type_id in dishes for dish in dishes[type_id]]
    
    return flask.jsonify(dishes)