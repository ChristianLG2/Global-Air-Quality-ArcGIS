# Global Air Quality ArcGIS Visualization

Video Walktrhough: https://youtu.be/ZHVR2CR8iy8 

This project provides an interactive web-based map that visualizes air quality measurements worldwide using data from the [OpenAQ API](https://openaq.org/). It supports pollutant filtering, intuitive color scaling, and dynamic marker sizing. The solution combines data engineering, geospatial rendering, and web development.

## Why This Map and These Metrics?

Air quality is a critical global health and environmental concern. This map was created to offer an intuitive, visual understanding of pollution levels across the globe. The selected metrics — **PM2.5**, **PM10**, and **NO₂** — are some of the most commonly monitored and impactful pollutants affecting human health:

- **PM2.5 (Particulate Matter ≤2.5μm)**: Fine particles from combustion (vehicles, industry, fires). Can penetrate deep into lungs and bloodstream, linked to heart disease and respiratory issues.
- **PM10 (Particulate Matter ≤10μm)**: Larger particles including dust, pollen, and mold. Harmful to people with asthma and other lung conditions.
- **NO₂ (Nitrogen Dioxide)**: A reactive gas emitted from vehicles and industrial facilities. Can cause respiratory problems and contributes to ozone formation and acid rain.

The map allows users to:
- Visually identify pollution hotspots.
- Compare air quality trends across countries and regions.
- Understand how different pollutants behave spatially.

By integrating normalized, preprocessed data with an interactive map, this tool empowers individuals, researchers, and policymakers to monitor air quality more effectively.

## Features

- Interactive world map using ArcGIS JavaScript API
- Pollutant filtering by:
  - PM2.5 (fine particulate matter)
  - PM10 (coarse particulate matter)
  - NO₂ (nitrogen dioxide)
- Dynamically styled markers (color and size) based on normalized pollutant levels
- Zoom-based visualization: country-level aggregation vs. station-level data
- Legend for interpreting pollution levels
- Preprocessed and normalized dataset for performance optimization

## Tools

- **Frontend**: HTML, CSS, JavaScript (ArcGIS API)
- **Backend/Data Processing**: Python (for data collection and normalization)
- **Data Source**: OpenAQ (open-source global air quality data)
- **Deployment**: GitHub Pages (optional)

## 📁 Project Structure

```plaintext
.
├── index.html                 # Main webpage with ArcGIS map
├── script.js                  # JavaScript logic for rendering and interaction
├── global_air_quality.json    # Preprocessed air quality data (3 pollutants)
├── country_averages.json      # Optional aggregated dataset
└── README.md                  # Project documentation


