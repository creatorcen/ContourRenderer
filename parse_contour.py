
import xml.etree.cElementTree  as ET
import logging

import json


import argparse



def parseNode(ele):
    node_id = ele.get("id")

    node_data = {}
    node_data["lat"]  = ele.get("lat")
    node_data["lon"]  = ele.get("lon")


    return node_id, node_data


def parseWay(ele, nodes):


    way_id = ele[1].get("id")
    way_nodes = []
    way_tags = {} 


    for child in ele[1]:
        if child.tag == 'nd':
            node_id = child.get("ref")

            way_nodes.append( nodes[node_id])

        elif child.tag == 'tag':
            k = child.get('k')
            v = child.get('k')

            way_tags[k] = v

        else:
            asdf

    return way_id, { 'tags': way_tags, 'nodes' : way_nodes}


def parse_file(filename):


    nodes = dict()

    count = 0


    # first run: parse nodes
    xml_it = ET.iterparse(filename,  events=('start', 'end'))
    for child in xml_it:

        if child[0] == 'start' and child[1].tag == 'node' :

            ele = child[1]

            node_id, node_data = parseNode(ele)
            nodes[node_id] = node_data






    # 2nd run: parse ways
    xml_it = ET.iterparse(filename,  events=('start', 'end'))

    ways = dict()
    count =0 
    for child in xml_it:

        if child[0] == 'start' and child[1].tag == 'way' :


            way_id, way_data = parseWay(child, nodes)
            ways[way_id] = way_data




        count+=1
        if count % 100 == 0:
            logging.info('parsing node %i', count)



    with open(filename + '.json', 'w') as f:
        json.dump(ways, f)


def main():
    for fn in input_files:
        parse_file(fn)

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('file',  help='file')


import sys
print(sys.argv)
input_files = sys.argv[1:]



#args = parser.parse_args()
#print( args.file)
#filename_osm = args.file
#

main()

