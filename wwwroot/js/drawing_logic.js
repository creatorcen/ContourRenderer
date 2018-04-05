function hideTooltip() {
    tooltipDiv
        .transition()
        .duration(200)
        .style('opacity', 0);
}
function showTooltip(innerHtml, posLeft, posRight) {
    console.log("show tooltip");
    tooltipDiv
        .transition()
        .duration(200)
        .delay(500)
        .style('opacity', 1);

    tooltipDiv
        .style('left', posLeft + 'px')
        .style('top', posRight + 'px');

    tooltipDiv.html(innerHtml);
}




function manualZoom(newZoomLevel) {
    zoomLevel = newZoomLevel;

    // d3Zoom.scaleTo emits a zoomed event,
    // therefore, the slider update is not needed
    updateSliderOnZoom = true;
    d3Zoom.scaleTo(d3.select('.drawing-area'), zoomLevel);
}

function zoomed() {
    d3.select('.drawing-area').attr('transform', d3.event.transform);
}



function drawCommunityBorders(geoDataRaw) {
    communityBorderData = geoDataRaw.map(function(d, i) {
        d.path_data =
            {
                'type': 'LineString',
                'coordinates': d.border.map(function(coords) {
                    return [coords[1], coords[0]];
                }),
            };
        return d;
    });

    // draw community borders
    let map = d3.selectAll('.map-cont')
        .selectAll('path')
        .data(communityBorderData)
        .enter()
        .append('path')
        .attr('d', function(d) {
            return path(d.path_data);
        })
        .attr('class', function(d) {
            return d.name + ' community';
        })
        .on('mouseover', function(d, index, data) {
            // d3.select(this).style('fill', 'black');

            d3.select(this)
                .attr('class', ' community-selected');

            showTooltip(d.name, d3.event.pageX + 10, d3.event.pageY - 35);
        })
        .on('mouseout', function(community, index, data) {
            // d3.select(this).style('fill', null);

            d3.select(this)
                .attr('class', community.name + ' community');

            hideTooltip();
        })
        .on('click', function(community, index, data) {
            if (selectedCommunity === community) {
                // put all peaks to foreground
                putPeakToForeground(d3.selectAll('.peak-lower'));

                selectedCommunity = null;
            } else {
                let sel = d3.selectAll('.peak-lower')
                    .filter(function(p) {
                        return d3.polygonContains(community.border, p.pos) === true;
                    });
                putPeakToForeground(sel);

                sel = d3.selectAll('.peak')
                    .filter(function(p) {
                        return d3.polygonContains(community.border, p.pos) === false;
                    });
                putPeakToBackground(sel);

                selectedCommunity = community;
            }
        }) // .on(click)
    ;
}
var cnt=0;
function drawGeoJsonElevation(e,d) {
    if (e !== null) {
        console.error(e);
        return;
    }
    console.log("elevation data loaded")

    eleData = d.features;

    let map = d3.selectAll('.map-vlbg')
        .selectAll('path')
        .data(eleData, function(d) {cnt+=1;return cnt;} )
        .enter()
        .append('path')
        .attr('d', function(d) {
            return path(d.geometry);
        })
        .attr('class', function(d) { return "id" + d.properties.ID + " ele" + d.properties.height;})
        


}

function drawEle(e, d) {
    if (e !== null) {
        console.error(e);
        return;
    }

    eleData = d;

    // TODO: use correct data

    let a = [];


    let cnt = 0
    for( let i in d) {
        a.push(d[i]);

        cnt += 1
        
    }

    dataproc = a.map(function(way,i) {

        coordinates = way.nodes.map(function(n) {return [n.lon, n.lat] ;} );

        return {
            'type': 'LineString',
            'coordinates': coordinates,
            'ele' : way.tags.ele,
            'id' : i
        };

    });

    //dataproc = dataproc.filter(function(d) {return d.ele % 250 === 0;})


    let map = d3.selectAll('.map-vlbg')
        .selectAll('path')
        .data(dataproc)
        .enter()
        .append('path')
        .attr('d', function(d) {
            return path(d);
        })
        .attr('class', function(d) { return "id" + d.id + " ele" + d.ele;})
        
}


function drawVlbg(e, d) {
    if (e !== null) {
        console.error(e);
        return;
    }

    vlbgData = d;

    // TODO: use correct data
    let vlbPath = [{
        type: 'LineString',
        coordinates: d[0].border.map(function(coords) {
            return [coords[1], coords[0]];
        }),
    }];

    let map = d3.selectAll('.map-ele')
        .selectAll('path')
        .data(vlbPath)
        .enter()
        .append('path')
        .attr('d', function(d) {
            return path(d);
        })
        .attr('class', 'vlbg');
}
