
function create_slope_shade
{
echo "processing ${1}.hgt"
gdaldem slope -scale 111120 -alg horn ${1}.hgt tmp.tif
gdaldem color-relief -of PNG tmp.tif color_slope.txt slopeshade_${1}.png

echo "file slopeshade_${1}.png written"
}

create_slope_shade N46E009
create_slope_shade N46E010
create_slope_shade N47E009
create_slope_shade N47E010


