# contour maps 


converts elevation data from http://viewfinderpanoramas.org/ and creates json file which can be render as svg with d3.js.

usage:

    bash create_data.sh [lon_min] [lat_min] [lon_max] [lat_max] [resolution]

e.g.:

    bash create_data.sh 9.8715 47.3086 9.9848 47.3606 10

start http server with root in wwwroot, e.g.

    cd wwwroot
    python -m SimpleHttpServer

## Overview

The following scripts can be used to extract information form hgt files (the are using gdal commands)
They are only usefull for extracting data of the files `N46E009.hgt`, `N46E010.hgt`, `N47E009.hgt`, `N47E010.hgt` (border region of Switzerland, Germany and Austria)

- create_contour.sh: extracts contour lines and stores them as geoJSON (needs stepsize as parameter)
- create_hillshading.sh
- create_reliefs.sh
- create_slope.sh


## Requirements: 

- gdal

## Links:

- http://viewfinderpanoramas.org/ 
- http://katze.tfiu.de/projects/phyghtmap/
