
OUTFOLDER="cut_data"

mkdir -p ${OUTFOLDER}



function cutfile {
  gdalwarp -te 9.4098 46.8073 10.2859 47.6524 $1 ${OUTFOLDER}/$1
}


cutfile "N46E010.hgt"
cutfile "N47E010.hgt"
cutfile "N46E009.hgt"
cutfile "N47E009.hgt"



