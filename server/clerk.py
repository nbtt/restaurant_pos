
import os
import flask
from flask.wrappers import Response

clerk = flask.Blueprint('clerk', __name__)


@clerk.route('/api/menu_management/data/all', methods=["GET"])
def getListDishes():
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "foods.json")
    dishes = flask.json.load(open(jsonUrl, "r", encoding="utf8"))
    
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl, "r", encoding="utf8"))

    dishes = [{**dish, "category" : type_dishes[type_id]["name"], "idcategory" : int(type_id)} for type_id in dishes for dish in dishes[type_id]]
    
    return flask.jsonify(dishes)

@clerk.route('/api/menu_management/data', methods=['POST'])
def addDish():
    # Open data
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl_dishes = os.path.join(SITEROOT, "data", "foods.json")
    dishes = flask.json.load(open(jsonUrl_dishes, "r", encoding="utf8"))
    
    jsonUrl_type_dishes = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl_type_dishes, "r", encoding="utf8"))

    # Get request data
    data = flask.request.get_json()
    if "idcategory" not in data.keys():
        return flask.Response("Category Id must be included.", status=400)
    typeid_new = str(data.pop("idcategory"))
    # If new type
    if typeid_new not in type_dishes.keys():
        # Add new type
        if "category" in data.keys():
            type_new = data.pop("category")
        else:
            type_new = "type" + typeid_new
        type_dishes[typeid_new] = {"id" : int(typeid_new), "name" : type_new, "img" : ""}

    # If new type
    if typeid_new not in dishes.keys():
        dishes[typeid_new] = []

    # Add data
    dishes[typeid_new].append(data)

    # Save
    flask.json.dump(dishes, open(jsonUrl_dishes, "w", encoding="utf8"), indent=4, ensure_ascii=False)
    flask.json.dump(type_dishes, open(jsonUrl_type_dishes, "w", encoding="utf8"), indent=4, ensure_ascii=False)

    return flask.Response("Add OK", status=200)

@clerk.route('/api/menu_management/data/delete', methods=['POST'])
def removeDish():
    # Open data
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl_dishes = os.path.join(SITEROOT, "data", "foods.json")
    dishes = flask.json.load(open(jsonUrl_dishes, "r", encoding="utf8"))
    
    jsonUrl_type_dishes = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl_type_dishes, "r", encoding="utf8"))
    # typename_dishes = {type_dishes[type_id]["name"] : type_id for type_id in dishes for dish in dishes[type_id]}

    # Get request data
    data = flask.request.get_json()
    # Data example:
    # data = {'id' : 10, 'idcategory' : 1}
    if "id" not in data.keys() or "idcategory" not in data.keys():
        return flask.Response("Must contains id and idcategory fields.", 400)

    # Check if given category is existed
    typeid_del = str(data.pop("idcategory"))
    if typeid_del not in type_dishes.keys():
        return flask.Response("Category not found", 400)

    # Check if given id is existed
    cur_type_dishes = dishes[typeid_del]
    cur_type_dishes_id = {dish["id"] : idx  for idx, dish in enumerate(cur_type_dishes)}

    if data["id"] not in cur_type_dishes_id.keys():
        return flask.Response("Dish id not found", 400)

    # Delete data
    dishes[typeid_del].pop(cur_type_dishes_id[data["id"]])

    # Save
    flask.json.dump(dishes, open(jsonUrl_dishes, "w", encoding="utf8"), indent=4, ensure_ascii=False)

    return flask.Response("Delete OK", 200)
