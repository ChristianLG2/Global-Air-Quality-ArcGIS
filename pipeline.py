#%%
import requests
import json
import time

API_KEY = "Insert_Your_API_Key_Here" 
BASE_URL = "https://api.openaq.org/v3/parameters/{id}/latest"
HEADERS = {"X-API-Key": API_KEY}

# 3 pollutants
PARAMETERS = {
    "pm25": 2,
    "pm10": 3,
    "no2": 5, 
}

LIMIT = 100
MAX_PAGES = 20

all_data = []

for name, pid in PARAMETERS.items():
    print(f"Fetching data for {name}...")
    for page in range(1, MAX_PAGES + 1):
        url = BASE_URL.format(id=pid)
        response = requests.get(
            url,
            headers=HEADERS,
            params={
                "limit": LIMIT,
                "page": page
            }
        )

        if response.status_code != 200:
            print(f"Failed for {name} - page {page}: {response.status_code}")
            break

        results = response.json().get("results", [])
        if not results:
            break

        for r in results:
            r["parameter"] = name

        all_data.extend(results)
        time.sleep(1)

print(f"Total records: {len(all_data)}")

# Save as a JSON file
with open("global_air_quality.json", "w", encoding="utf-8") as f:
    json.dump({"results": all_data}, f, indent=2)

print("Saved to global_air_quality.json")

# %%
import json
from pathlib import Path
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np

# Load the simplified global air quality data
data_path = Path("global_air_quality.json")
with open(data_path, "r", encoding="utf-8") as f:
    raw_data = json.load(f)["results"]

# Convert to DataFrame for easier processing
df = pd.json_normalize(raw_data)

# Filter for valid numeric values only
df = df[df["value"].notna() & df["coordinates.latitude"].notna() & df["coordinates.longitude"].notna()]

# Normalize value per parameter
normalized_data = []
for param in df["parameter"].unique():
    sub_df = df[df["parameter"] == param].copy()
    scaler = MinMaxScaler()
    sub_df["normalized_value"] = scaler.fit_transform(sub_df[["value"]])
    normalized_data.append(sub_df)

# Concatenate all normalized parameter data
normalized_df = pd.concat(normalized_data)

# Select relevant fields and rename for clarity
normalized_df = normalized_df[[
    "parameter",
    "value",
    "normalized_value",
    "coordinates.latitude",
    "coordinates.longitude",
    "datetime.utc"
]].rename(columns={
    "coordinates.latitude": "latitude",
    "coordinates.longitude": "longitude",
    "datetime.utc": "utc"
})

# Convert to dict format
normalized_records = normalized_df.to_dict(orient="records")

# Save to new JSON
output_path = "global_air_quality_normalized.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"results": normalized_records}, f, indent=2)

output_path


# %%
