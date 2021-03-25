# Leaflet Hash Plus

[Leaflet](https://leafletjs.com/) mappping plugin for interacting the location hash in the address bar. Allows for you to update the hash and for your code to be notified of changes in the hash (by the user navigating) or manually editing the location hash.

![Leaflet-Hash-Plus](https://github.com/gregrobson/leaflet-hash-plus/tree/main/screenshots/leaflet-hash-plus.png?raw=true)

This plugin is based on [Leaflet-hash](https://github.com/mlevans/leaflet-hash). This plugin has seen no activity since 2013 and I'm judging it to abandoned. Out of my own necessity I have I have built Leaflet Hash **Plus** to support an expanded set of features (some requested for leaflet-hash).

## Status

This plugin is current an alpha version: you are welcome to test it but please be aware that the API, names and conventions used within this plugin are liable to change.

Please check the [change log](CHANGELOG.md) for the changes.

## Overview

The idea of embedding zoom, latitude and longitude into the location hash is fairly obvious: `map.html#13.0000/54.5252/-3.0151` is much better for bookmarking so that when you return to the map it's in the same location/zoom as where you left it, however it doesn't address bookmarking extra map data such as objects, layers and other items that make up the map's state.

Leaflet Hash Plus allows for **extra** parameters after the zoom/location hash properties, entirely of your choosing.

The approach is low level to allow for it to be used in a wide variety of scenarios. If you want your location hash to reflect enabled layers such as *restaurants*, *shops* and *transport* and the option of showing the weather, you can either encode the data as:

`map.html#13.0000/54.5252/-3.0151/layer:restaurants/layer:shops/layer:transport/weather=true`

or

`map.html#13.0000/54.5252/-3.0151/layers:restaurants,shops,transport/weather=true`

The choice is yours. The meta data you pass to the plugin and receive from it is just an array of strings, using the '/' as a delimiter. If the map was loaded using the second link you would receive `['layers:restaurants,shops,transport', 'weather=true']` as the hash meta data.

If your code wanted to update the hash to reflect that the map is now only showing shops and weather is disabled, you would pass this meta data to the plugin `['layers=shops', 'weather=false']`.

## How does it work?

Documentation and demos can found [here](https://gregrobson.github.io/leaflet-hash-plus/).

You can also [check out the comments in the source code](https://github.com/gregrobson/leaflet-hash-plus/blob/main/src/leaflet-hash-plus.js)
