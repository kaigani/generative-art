var fs = require('fs')
var hub = []

function makeNode(){
  var a = []
  for(var i=0; i<100000; i++){
    a.push({x:i,y:i,z:i})
  }
  return a
}

var node = makeNode()
var flatNode = node.map(o => ""+o.x+o.y+o.z).join('')


fs.writeFile('data.json', JSON.stringify(node), (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

fs.writeFile('flat-data.txt', flatNode, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

// This will kill anything
/*
for(var i=0;i<10000;i++){
  hub.push( makeNode() )
}

console.log('SUCCESS!',hub.length,hub[200].length)
*/
