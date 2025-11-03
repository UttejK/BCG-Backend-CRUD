import csv, json

input_csv = "./product data.csv"
output_json = "./product_data.json"

app_label = "price_optimizer"
model_name = "product"

data = []
with open(input_csv, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append(
            {
                "model": f"{app_label}.{model_name}",
                "fields": {
                    "name": row["name"],
                    "description": row["description"],
                    "cost_price": float(row["cost_price"]),
                    "selling_price": float(row["selling_price"]),
                    "category": row["category"],
                    "stock_available": int(row["stock_available"]),
                    "units_sold": int(row["units_sold"]),
                    "customer_rating": int(row["customer_rating"]),
                    "demand_forecast": int(row["demand_forecast"]),
                    "optimized_price": float(
                        row["optimized_price"] if row["optimized_price"] else 0
                    ),
                },
            }
        )
with open(output_json, "w", encoding="utf-8") as jsonfile:
    json.dump(data, jsonfile, indent=4)

print(f"Data successfully converted from {input_csv} to {output_json}")
