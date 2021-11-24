from flask import Flask
from menuController import menuController
from menuManagementController import menuManagementController
from order import order

app = Flask(__name__)
app.register_blueprint(menuManagementController)
app.register_blueprint(menuController)
app.register_blueprint(order)

app.run()