import os
import flask
from flask import request, session, redirect, url_for
import json
from datetime import datetime

order = flask.Blueprint('order', __name__)

@order.route("/", methods=["GET"])
def index():
    return '''<h1>Test API for Software engineering</h1>'''

@order.route("/api/order_management/order", methods = ["GET"])
def queryOrder():
    '''Get order by ID'''
    id = flask.request.args.get("id")
    if (id == None):
        return flask.Response("Invalid syntax, please specify an id", status=400)
    else:
        id = str(id)

    #https://stackoverflow.com/questions/21133976/flask-load-local-json
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    jsonUrl = os.path.join(SITEROOT, "data", "foods.json")
    data = flask.json.load(open(jsonUrl, "r"))

    order = orderList[id]
    date = order["date"]
    status = order["status"]
    listDish = order["listDish"]
    dishes = []
    for i in range(len(listDish)):
        quantity = listDish[i]["quantity"]
        typeID, foodID = listDish[i]["typeID"], listDish[i]["foodID"] 
        foodName = data[str(typeID)][int(foodID)]["name"]
        foodPrice = data[str(typeID)][int(foodID)]["price"]
        dishes.append([foodName, quantity, foodPrice])
    return flask.jsonify([id, dishes, date, status])
    
@order.route("/api/order_management/getLish", methods = ["GET"])
def getOrderList():
    '''Get order list'''
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    jsonUrl = os.path.join(SITEROOT, "data", "foods.json")
    data = flask.json.load(open(jsonUrl, "r"))

    ListOrder = []

    for id in range(len(orderList)):
        order = orderList[str(id)]
        date = order["date"]
        status = order["status"]
        listDish = order["listDish"]
        dishes = []
        for i in range(len(listDish)):
            quantity = listDish[i]["quantity"]
            typeID, foodID = listDish[i]["typeID"], listDish[i]["foodID"] 
            foodName = data[str(typeID)][int(foodID)]["name"]
            foodPrice = data[str(typeID)][int(foodID)]["price"]
            dishes.append([foodName, quantity, foodPrice])
        ListOrder.append([id, dishes, date, status])
    return flask.jsonify(ListOrder)

@order.route("/api/dishes_management/edit", methods = ["GET", "POST"])
def updateOrder():
    '''update order after edit'''
    id = flask.request.args.get("id")
    if (id == None):
        return flask.Response("Invalid syntax, please specify an id", status=400)
    else:
        id = int(id)

    if request.method == "POST":
        session.permanent = True
        newStatus = request.form["status"]
        newList = request.form["list"]
        
        SITEROOT = os.path.realpath(os.path.dirname(__file__))
        jsonUrl = os.path.join(SITEROOT, "data", "order.json")
        orderList = flask.json.load(open(jsonUrl, "r"))

        for entry in orderList:
            if (entry["id"] == id):
                entry["status"] = newStatus
                entry["listDish"] = newList
                break
    else:
        return redirect(url_for("getOrderList"))

@order.route("/api/dishes_management/add", methods = ["POST"])
def addOrder():
    '''add new order'''
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    json_data = flask.request.json

    #Check id param
    if "id" in json_data and json_data["id"] != None:
        newId = json_data["id"]
        print(type(newId))
        if (type(newId) == int):
            return flask.Response("ID must be a string", status=400)

        if (newId in orderList):
            return flask.Response("Duplicate ID", status=400)
    else:
        maxId = max([int(id) for id in orderList])
        newId = str(maxId + 1)
        json_data["id"] = newId
    orderList[newId] = json_data

    #Check date param
    if "date" not in json_data or json_data["date"] == None:
        json_data["date"]= datetime.today().strftime('%Y/%m/%d')

    with open(jsonUrl, "w") as f:
        #https://stackoverflow.com/questions/7907596/json-dumps-vs-flask-jsonify
        f.write(json.dumps(orderList, indent = 4))

    #return flask.jsonify(orderList)
    return flask.Response("Success", status=200)

@order.route("/api/dishes_management/remove", methods = ["POST"])
def removeOrder():
    '''remove order form list'''

<<<<<<< HEAD
'''run'''
app.run()
=======
    #Handle both POST request in both json and form type
    if request.json != None and "id" in request.json:
        id = request.json["id"]
    elif request.form != None and "id" in request.form:
        id = request.form.get("id")
    else:
        return flask.Response("Please provide an ID", status=400)

    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    if id not in orderList:
        return flask.Response("Id is not in database", status=400)
    else:
        orderList.pop(id)
        with open(jsonUrl, "w") as f:
            f.write(json.dumps(orderList, indent=4))
        return flask.Response("Success", status=200)
>>>>>>> master
