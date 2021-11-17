import os
import flask

app = flask.Flask(__name__)

@app.route('/api/menu_management/data/all', methods=["GET"])
def getListDishes():
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "data.json")
    dishes = flask.json.load(open(jsonUrl, "r"))
    
    jsonUrl = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl, "r"))

    dishes = [{**dish, "category" : type_dishes[type_id]["name"]} for type_id in dishes for dish in dishes[type_id]]
    
    return flask.jsonify(dishes)

@app.route('/api/menu_management/data', methods=['GET', 'POST'])
def getUpdateDish():
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl_dishes = os.path.join(SITEROOT, "data", "data.json")
    dishes = flask.json.load(open(jsonUrl_dishes, "r"))
    
    jsonUrl_type_dishes = os.path.join(SITEROOT, "data", "types.json")
    type_dishes = flask.json.load(open(jsonUrl_type_dishes, "r"))
    typename_dishes = {type_dishes[type_id]["name"] : type_id for type_id in dishes for dish in dishes[type_id]}

    data = flask.request.get_json()
    type_new = data.pop("category")
    if type_new not in typename_dishes.keys():
        # Add new type
        last_typeid = int(list(type_dishes.keys())[-1])
        cur_typeid = last_typeid + 1
        type_dishes[str(cur_typeid)] = {"id" : cur_typeid, "name" : type_new, "img" : ""}
        cur_typeid = str(cur_typeid)
    else:
        cur_typeid = typename_dishes[type_new]

    if cur_typeid not in dishes.keys():
        dishes[cur_typeid] = []

    dishes[cur_typeid].append(data)

    flask.json.dump(dishes, open(jsonUrl_dishes, "w"), indent=4)
    flask.json.dump(type_dishes, open(jsonUrl_type_dishes, "w"), indent=4)

    return "Add OK"

app.run()