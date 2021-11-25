import os
import flask
from flask import request
import json
from datetime import datetime
from . import main
from .. import socketio

@main.route("/api/order_management/updateStatus", methods = ["GET"])
def updateStatus():
    id = flask.request.args.get("id")
    id = int(id[2::])
    
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    order = orderList[str(id)]
    status = flask.request.args.get("status")
    order["status"] = int(status)
    with open(jsonUrl, "w") as f:
        f.write(json.dumps(orderList, indent=4))
        
    return flask.Response("Success", status=200)

@main.route("/api/order_management/getList", methods = ["GET"])
def getOrderList():
    '''Get order list'''
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    for id, order in orderList.items():
        order["id"] = "DH{:02d}".format(int(id))

    return flask.jsonify(list(orderList.values()))

def sendNewOrder(order):
    order["id"] = "DH{:02d}".format(int(order["id"]))
    socketio.emit('addOrder', order)

@main.route("/api/order_management/add", methods = ["POST"])
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
        maxId = -1 if len(orderList) == 0 else max([int(id) for id in orderList])
        newId = str(maxId + 1)
        json_data["id"] = newId

    foodUrl = os.path.join(SITEROOT, "data", "foods.json")
    data = flask.json.load(open(foodUrl, "r"))

    for dish in json_data["listDish"]:
        typeID, foodID = dish["typeID"], dish["foodID"] 
        for food in data[str(typeID)]:
            if int(foodID) == int(food["id"]):
                dish["name"] = food["name"]
                dish["price"] = food["price"]
                dish.pop('typeID')
                dish.pop('foodID')
                break

    orderList[newId] = json_data

    #Check date param
    if "date" not in json_data or json_data["date"] == None:
        json_data["date"]= datetime.today().strftime('%Y/%m/%d')

    with open(jsonUrl, "w") as f:
        #https://stackoverflow.com/questions/7907596/json-dumps-vs-flask-jsonify
        f.write(json.dumps(orderList, indent = 4))

    sendNewOrder(json_data)
    #return flask.jsonify(orderList)
    return flask.Response("Success", status=200)

@main.route("/api/order_management/remove", methods = ["POST"])
def removeOrder():
    '''remove order form list'''
    #Handle both POST request in both json and form type
    if request.json != None and "id" in request.json:
        id = request.json["id"]
    elif request.form != None and "id" in request.form:
        id = request.form.get("id")
    else:
        return flask.Response("Please provide an ID", status=400)
    id = str(int(id[2::]))
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    if id not in orderList.keys():
        return flask.Response("Id is not in database", status=400)
    else:
        orderList.pop(id)
        with open(jsonUrl, "w") as f:
            f.write(json.dumps(orderList, indent=4))
        return flask.Response("Success", status=200)
