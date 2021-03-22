# Leaflet Hash Plus
Allows the map to manipulate the location hash and for the hash to manipulate Leaflet map state: not just zoom and centre but other properties as you wish.

This plugin is heavily based on the work done here[https://github.com/mlevans/leaflet-hash](https://github.com/mlevans/leaflet-hash). Unfortunately the plugin has seen no activity since 2013 and I'm judging it to abandoned. Out of my own necessity I have I have built Leaflet Hash **Plus** to support an expanded set of features (some requested for leaflet-hash).

## Status

This plugin is current an alpha version: you are welcome to test it but please be aware that the API, names and conventions used within this plugin are liable to change.

## Overview

The idea of embedding zoom, latitude and longitude into the location hash is fairly obvious: `map.html#13.0000/54.5252/-3.0151` is much better for bookmarking so that when you return to the map it's in the same location/zoom as where you left it.

Leaflet Hash Plus takes this one step further and allows for **extra** parameters after the hash, entirely of your choosing as an array of strings.

The approach is low level to allow for customisation for a wide range of scenarios. If you want your location hash to reflect enabled layers such as *restaurants*, *shops* and *transport* and the option of showing the weather, you can encode this as:

`map.html#13.0000/54.5252/-3.0151/layer:restaurants/layer:shops/layer:transport/weather=true`

or

`map.html#13.0000/54.5252/-3.0151/layers:restaurants,shops,transport/weather=true`

The choice is yours. The meta data you pass to the plugin and receive from it is just an array of strings, using the '/' as a delimiter. If the map was loaded using the second link you would receive `['layers:restaurants,shops,transport', 'weather=true']` as the meta data.

If your code wanted to update the hash to only show only shops and no weather, you would pass this meta data to the plugin `['layers=shops', 'weather=false']`.
