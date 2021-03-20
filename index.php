<!doctype html>
<head>
  <title>Map Test</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="anonymous" />

  <script src="/src/leaflet-hash-plus.js"></script>

  <style>
    #map {
      height: 100vh;
      width: 100vw;
      font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-size: 10pt;
    }
  </style>
</head>
<body style="padding: 0; margin: 0;">


<div id="map"></div>
<!--
  How should this shape up?

  There should be a way for us to update the Hash State in LHP by sending properties
  into it.

  There should be a way for LHP to know that we have parsed a correct URL by checking
  it against the external calling code.

  There should be a way for LHP to communicatate hash changes to the calling code.

-->


  <!-- Add your site or application content here -->
  <script>
  // window.addEventListener("hashchange", function(event) {
  //   console.log('hash has changed!', event);
  // }, false);

    var map = L.map('map', {
      zoomSnap: 1,
      // zoomDelta: 1,
      center: [54.526506,-2.9995729],
      zoom: 10,
    });

    var clickHandler = function(e) {
      console.log('mouse click!', e.sourceTarget.options);
      hash.setHashMeta([e.sourceTarget.options.id]);
    };

    var markers = [];
    markers[1] = L.marker([54.523506,-2.9995729], {id: 1}).addTo(map);
    markers[2] = L.marker([54.523506,-2.9095729], {id: 2}).addTo(map);

    markers[1].bindPopup('Marker 1');
    markers[2].bindPopup('Marker 2');

    markers[1].on('click', clickHandler);
    markers[2].on('click', clickHandler);

    map.on("hashmetachange", function(newState) {
      console.log('hashmetachange detected', newState.meta);
      markers[newState.meta[0]].openPopup();
    });
    var hash = new L.Hash(map);

    L.tileLayer(
      // Stadia Maps...
      // 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      // ... or Thunderforest?
      'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}{r}.png?apikey=a4d6112fa0d84675a07c128d0d0fed64',
      {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        zoomOffset: -1,
        tileSize: 512,
      }
    )
    .addTo(map);





    // hash.setHashMeta(['test3']);
  </script>
</body>
</html>
