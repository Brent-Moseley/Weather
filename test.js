// Solution to Kata 4, part I:  http://codekata.com/kata/kata04-data-munging/


fs = require('fs');
var data, lines;
var ready = false;
fs.readFile('weather.dat', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  lines = data.split('\n');
  //console.log(data);
  ready = true;
  show();
});

function show () {
  console.log('Lines read: ' + lines.length);
  for (var i = 2; i < lines.length; i++) {    // skip header and blank line
  	//console.log (data2[i]);
  	console.log ("Line: " + i);
  	var vals = lines[i].split(' ');
  	console.log (vals[0] + ',' + vals[1] + ',' + vals[2]);
  	// for (var j = 0; j < 3; j++) {
  		
  	// } 
  }
}  
