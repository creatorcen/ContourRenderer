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

The script `create_data.sh` performs the following actions:

- calls phyghtmap (needs to be installed)
- - downloads the elevation model data from viewfinderpanoramas
- - converts the data to `osm` fileformat
- converts the osm files to json format
- concats the json files
- moves the data to `wwwroot/data`


## Requirements: 

- phyghtmap

## Links:

- http://viewfinderpanoramas.org/ 
- http://katze.tfiu.de/projects/phyghtmap/
