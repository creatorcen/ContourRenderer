#!/bin/bash

lon_min=$1
lon_max=$3
lat_min=$2
lat_max=$4

res=$5

OUTFILENAME="output.json"

mkdir -p data_tmp
pushd data_tmp

echo "phyghtmap -a $lon_min:$lat_min:$lon_max:$lat_max --source=view3 -s $res  5N47E009.hgt N47E010.hgt"
phyghtmap -a "$lon_min:$lat_min:$lon_max:$lat_max" --source=view3 -s $res  5N47E009.hgt N47E010.hgt


python ../parse_contour.py *.osm


sed -i 's/{{{/{{/g' *.osm.json
sed -i 's/}}}/}}/g' *.osm.json


sed -i 's/^{//g' *.osm.json
sed -i 's/}$//g' *.osm.json

echo "{" > $OUTFILENAME
for fn in *.osm.json ; do
    cat $fn >> $OUTFILENAME
    echo -n "," >> $OUTFILENAME
done
# deleting the last ,
echo  "}" >> $OUTFILENAME
echo "correcting"
sed -i 's/,}/}/' $OUTFILENAME

mv $OUTFILENAME ../wwwroot/data

# creating bounding box as json file
echo """

let boundingBoxMap =
  {
    type: 'LineString',
    coordinates: [
      [$lon_max, $lat_max],
      [$lon_min, $lat_max],
      [$lon_min, $lat_min],
      [$lon_max, $lat_min],
    ],
  };
""" > ../wwwroot/js/boundingBox.js


popd


