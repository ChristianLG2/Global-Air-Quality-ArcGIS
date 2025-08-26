// script.js - With dynamic filtering and map legend
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer"
], function(Map, MapView, Graphic, GraphicsLayer) {

  const map = new Map({
    basemap: "hybrid"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [0, 20],
    zoom: 2
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  fetch("global_air_quality.json")
    .then(res => res.json())
    .then(data => {
      console.log("Loaded data:", data.results.length);
      const allData = data.results;

      // Populate filter dropdown dynamically
      const parameters = [...new Set(allData.map(d => d.parameter))].sort();
      const dropdown = document.getElementById("parameterFilter");
      dropdown.innerHTML = '<option value="all">All</option>';
      parameters.forEach(param => {
        const opt = document.createElement("option");
        opt.value = param;
        opt.textContent = param.toUpperCase();
        dropdown.appendChild(opt);
      });

      // Render all points initially
      renderPoints(allData);

      // Listen for filter changes
      dropdown.addEventListener("change", function () {
        const selected = this.value;
        graphicsLayer.removeAll();
        const filtered = selected === "all"
          ? allData
          : allData.filter(d => d.parameter === selected);
        renderPoints(filtered);
      });

      function renderPoints(dataset) {
        dataset.forEach(entry => {
          if (
            entry.coordinates &&
            entry.value > 0 &&
            entry.coordinates.latitude &&
            entry.coordinates.longitude
          ) {
            const point = {
              type: "point",
              latitude: entry.coordinates.latitude,
              longitude: entry.coordinates.longitude
            };

            const symbol = {
              type: "simple-marker",
              color: getColor(entry.value),
              size: getSize(entry.value)
            };

            const popupTemplate = {
              title: `${entry.parameter.toUpperCase()} Level`,
              content: `
                <b>Value:</b> ${entry.value}<br>
                <b>Date:</b> ${entry.datetime.utc}`
            };

            const graphic = new Graphic({
              geometry: point,
              symbol,
              popupTemplate
            });

            graphicsLayer.add(graphic);
          }
        });
      }

      // Add legend manually
      const legendContainer = document.createElement("div");
      legendContainer.id = "legend";
      legendContainer.style.position = "absolute";
      legendContainer.style.bottom = "20px";
      legendContainer.style.right = "20px";
      legendContainer.style.background = "white";
      legendContainer.style.padding = "10px";
      legendContainer.style.borderRadius = "6px";
      legendContainer.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
      legendContainer.innerHTML = `
        <strong>Air Quality Levels</strong><br>
        <span style='color:green'>●</span> Good (0–15)<br>
        <span style='color:orange'>●</span> Moderate (15–30)<br>
        <span style='color:red'>●</span> Unhealthy (30–75)<br>
        <span style='color:purple'>●</span> Very Unhealthy (75+)
      `;
      document.body.appendChild(legendContainer);
    })
    .catch(error => console.error("❌ Failed to load data:", error));

  function getColor(val) {
    if (val < 15) return "green";
    else if (val < 30) return "orange";
    else if (val < 75) return "red";
    else return "purple";
  }

  function getSize(val) {
    if (val < 15) return "6px";
    else if (val < 30) return "10px";
    else if (val < 75) return "14px";
    else return "18px";
  }
});













