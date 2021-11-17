from re import A
from flask import Flask
from client import client
from clerk import clerk
from order import order

app = Flask(__name__)
app.register_blueprint(clerk)
app.register_blueprint(client)
app.register_blueprint(order)

app.run()