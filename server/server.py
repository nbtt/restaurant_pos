from flask import Flask
from menuController import menuController
from clerk import clerk
from order import order

app = Flask(__name__)
app.register_blueprint(clerk)
app.register_blueprint(menuController)
app.register_blueprint(order)

app.run()