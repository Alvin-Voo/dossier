import json

fin = open('ep6.json','r')
jsonobj = json.load(fin)
mapdataarray = jsonobj['layers'][1]['data']
fout = open('output6.csv','w')


for y in range(0,28):
	start = y * 60;
	end = 60 + start;
	for x in range(start, end):
		fout.write(str(mapdataarray[x]))
		fout.write(' ')
	fout.write('\n')

