import os
import flask
from flask import request, session, redirect, url_for

app = flask.Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return '''<h1>Test API for Software engineering</h1>'''

@app.route("/api/order_management/order", methods = ["GET"])
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

    jsonUrl = os.path.join(SITEROOT, "data", "data.json")
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
    
@app.route("/api/order_management/getLish", methods = ["GET"])
def getOrderList():
    '''Get order list'''
    SITEROOT = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(SITEROOT, "data", "order.json")
    orderList = flask.json.load(open(jsonUrl, "r"))

    jsonUrl = os.path.join(SITEROOT, "data", "data.json")
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

@app.route("/api/dishes_management/edit", methods = ["GET", "POST"])
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

def addOrder():
    '''add new order'''
    return

def removeOrder():
    '''remove order form lish'''
    return


'''run'''
app.run()