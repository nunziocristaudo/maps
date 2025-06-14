
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('./tiles/{z}/{x}/{y}.png', {
  maxZoom: 5,
  minZoom: 1,
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

localforage.config({
  name: 'offlineMapPins'
});

map.on('click', function(e) {
  const marker = L.marker(e.latlng).addTo(map);
  localforage.getItem('pins').then(pins => {
    pins = pins || [];
    pins.push(e.latlng);
    localforage.setItem('pins', pins);
  });
});

localforage.getItem('pins').then(pins => {
  if (pins) {
    pins.forEach(pos => {
      L.marker(pos).addTo(map);
    });
  }
});
