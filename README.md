# Project-3
Our project 3 is about Yelp reviews of restaurants in Arizona. 
EXTRACT
We used a dataset from kaggle:
https://www.kaggle.com/yelp-dataset/yelp-dataset

TRANSFORM
We had to clean and filter the dataset by minimizing the 175,000 rows provided to only name, city, state, address, longitude, latitude, stars, and review counts.
For city column, we dropped the duplicates and NA values and spelled the cities correctly. and it resulted to 52,000 rows for arizona leading to our dataset called 'az_yelp_business' then filtering restaurants.

LOAD
we used plotly java script to create bar graphs based on Top ten Categories and restaurants, another one by star ratings and top ten restuarants, lastly top ten restaurants by review count. We used postgres to load the restaurant summary table. 
Using leaflet we created a geomap based on restaurants and created a filter overlay of star ratings.

###Resources
We have our notebooks on how we cleaned the data and loaded the data into the database. We have csv and json files.


###Presentation
Slide deck of presentation.
