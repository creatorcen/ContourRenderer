

function create_contour_json {
  echo "create $2 contour  for file $1"
  gdal_contour -a height -f 'geojson' ${1}.hgt ${1}_${2}.json -i ${2}
  #echo "   converting shapefile"
  #ogr2ogr -f  GeoJSON N47E010_${2}m.json tmp.shp
}


F=N46E009
create_contour_json $F $1


F=N46E010
create_contour_json $F $1


F=N47E009
create_contour_json $F $1


F=N47E010
create_contour_json $F $1

