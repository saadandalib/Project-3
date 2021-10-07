from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float 
import pandas as pd
from IPython.display import HTML


rds_connection_string = "postgres:postgres@localhost:5432/restaurants_db"
engine = create_engine(f'postgresql://{rds_connection_string}')
topten_data = pd.read_sql_query('select * from restaurants', con=engine)
restaurant_data = pd.read_sql_query('select * from az_restaurants', con=engine)

# Create an instance of Flask
app = Flask(__name__)

# Route to render index.html template 
@app.route("/")
def home():

    data_html = HTML(topten_data.to_html(index=False,classes='table table-dark table-striped'))
    
    # Return template and data
    return render_template("/index.html", topten = data_html)

if __name__ == "__main__":
    app.run(debug=True)
