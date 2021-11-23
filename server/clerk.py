
import os
import flask

clerk = flask.Blueprint('clerk', __name__)


@clerk.route('/api/menu_management/data/all', methods=["GET"])
def getListDishes():
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "foods.json")
    dishes = flask.json.load(open(jsonUrl, "r", encoding="utf8"))
    
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl, "r", encoding="utf8"))

    dishes = [{**dish, "category" : type_dishes[type_id]["name"]} for type_id in dishes for dish in dishes[type_id]]
    
    return flask.jsonify(dishes)

@clerk.route('/api/menu_management/data', methods=['POST'])
def addDish():
    # Open data
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl_dishes = os.path.join(SITEROOT, "data", "foods.json")
    dishes = flask.json.load(open(jsonUrl_dishes, "r", encoding="utf8"))
    
    jsonUrl_type_dishes = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl_type_dishes, "r", encoding="utf8"))
    typename_dishes = {type_dishes[type_id]["name"] : type_id for type_id in dishes for dish in dishes[type_id]}

    # Get request data
    data = flask.request.get_json()
    type_new = data.pop("category")
    # If new type
    if type_new not in typename_dishes.keys():
        # Add new type
        last_typeid = int(list(type_dishes.keys())[-1])
        cur_typeid = last_typeid + 1
        type_dishes[str(cur_typeid)] = {"id" : cur_typeid, "name" : type_new, "img" : ""}
        cur_typeid = str(cur_typeid)
    else:
        cur_typeid = typename_dishes[type_new]

    # If new type
    if cur_typeid not in dishes.keys():
        dishes[cur_typeid] = []

    # Add data
    dishes[cur_typeid].append(data)

    # Save
    flask.json.dump(dishes, open(jsonUrl_dishes, "w", encoding="utf8"), indent=4, ensure_ascii=False)
    flask.json.dump(type_dishes, open(jsonUrl_type_dishes, "w", encoding="utf8"), indent=4, ensure_ascii=False)

    return "Add OK"

@clerk.route('/api/menu_management/data/delete', methods=['POST'])
def removeDish():
    # Open data
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl_dishes = os.path.join(SITEROOT, "data", "foods.json")
    dishes = flask.json.load(open(jsonUrl_dishes, "r", encoding="utf8"))
    
    jsonUrl_type_dishes = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl_type_dishes, "r", encoding="utf8"))
    typename_dishes = {type_dishes[type_id]["name"] : type_id for type_id in dishes for dish in dishes[type_id]}

    # Get request data
    data = flask.request.get_json()
    # Data example:
    # data = {'id' : 10, 'category' : 'category name'}

    # Check if given category is existed
    if data["category"] not in typename_dishes.keys():
        return "Category not found"

    # Check if given id is existed
    cur_type_dishes = dishes[typename_dishes[data["category"]]]
    cur_type_dishes_id = {dish["id"] : idx  for idx, dish in enumerate(cur_type_dishes)}

    if data["id"] not in cur_type_dishes_id.keys():
        return "Dish not found"

    # Delete data
    dishes[typename_dishes[data["category"]]].pop(cur_type_dishes_id[data["id"]])

    # Save
    flask.json.dump(dishes, open(jsonUrl_dishes, "w", encoding="utf8"), indent=4, ensure_ascii=False)

    return "Delete OK"
