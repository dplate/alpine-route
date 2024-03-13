# Alpine Route

A game about planing mountain routes. 

On a high resolution map (displayed in 2D) a route between two points must be planned. Goal is to find the route which can be built with minimal costs. Costs are determined by the length of the route, the length of tunnels and the length of bridges. There are also hard limitations: how steep a route can be (e.g. not too steep for a train) or how tight bends can be (e.g. not too tight for motor ways).

The current development version can by "played" here: https://dplate.github.io/alpine-route/

## Todo

- [X] Automate process to create high resolution height maps from public available data
- [X] Render height map as texture with WebGPU shader
- [X] Use a color ramp to color the height of the map
- [X] Render contour lines with help of shader magic
- [X] Add shading to map
- [X] Zoom and panning of map
- [X] Overlay with a cubic spline curve
- [X] Make curve editable by adding, moving and removing control points
- [X] Add height profile of curve
- [X] Make height profile editable by adding, moving and removing control points
- [X] Add magnified view to make touch usage easier by showing map under the finger bigger
- [X] Calculate costs of route
- [ ] Validate route (not breaking steepness, tunnel length, bridge length limits and enough money left)
- [ ] Add scalable interface which includes map, profile, magnifier, costs and menu
- [ ] Level selection (including description and money)
- [ ] Create levels
- [ ] Finalize game (start screen, credits...)
- [ ] Create Android app

## Evaluation of height data

Source for height data:

https://www.swisstopo.admin.ch/en/geodata/height/alti3d.html

Thoughts:
- GeoTiff are viewable with QGIS
- Processing GeoTiff with JS: https://github.com/geotiffjs/geotiff.js/
- Maybe easier to use and process plain text XYZ files 
- Heights are available in centimeters, but decimeter resolution is good enough, which fit into 16bit (max height difference of 6500m)
- Storing height map as 16 bit gray scale png, 24bit split r/g/b or custom binary data
- Fits the whole height map as texture into memory or is some kind of mip mapping needed and async loading needed?
- 2m grid resolution should be good enough, with a texture size of 4096x4096px this would allow a 8km x 8km area

## Credits

### Map data

- Federal Office of Topography swisstopo
- ©swisstopo