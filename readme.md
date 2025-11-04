# Price Optimization Tool — Backend

_A Django + Django REST Framework backend for product management, demand forecasting visualization, and price optimization._

---

## Quick reference commands

```bash
# install requirements
pip install -r requirements.txt

# run dev server
python manage.py runserver

# migrations
python manage.py makemigrations
python manage.py migrate

# create superuser
python manage.py createsuperuser

# Next step, use django admin, create groups and users and assign them to the groups

# bootstrap groups + perms (optional)
python manage.py bootstrap_rbac

# convert the csv data into json format (creating a fixture)
python preprocess_csv_json.py

# load the data into the db
python manage.py loaddata product_data.json

# manual load
python manage.py loaddata products.json
```
