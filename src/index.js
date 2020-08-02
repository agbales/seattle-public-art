const data = fetch("https://data.seattle.gov/resource/public-art.json")
  .then((response) => response.json())
  .then((data) => {
    L.mapbox.accessToken =
      "pk.eyJ1IjoiYWdiYWxlcyIsImEiOiJja2QzaXpoYmcwcHpvMnFwNXFkNGc3bGViIn0.1-It5YQVKRZ1yHxSsuIRAw";
    var map = L.mapbox
      .map("map")
      .setView([47.6062, -122.3321], 13)
      .addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/streets-v11"));

    data.forEach((entry) => {
      const lat = entry.latitude;
      const long = entry.longitude;

      const artInfo = `<div>
                        <span class="classification">${
                          entry.classification
                        }</span>
                        <div class="info">"${entry.title}" (${entry.date})</div>
                        <div class="info">${entry.artist_first_name || ""} ${
        entry.artist_last_name || ""
      }</div>
                        <div class="info">${entry.location}</div>
                    </div>`;
      L.marker([lat, long]).addTo(map).bindPopup(artInfo);
    });
  });
