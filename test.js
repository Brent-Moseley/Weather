// Solution to Kata 4, part I:  http://codekata.com/kata/kata04-data-munging/


// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var data, lines;
var ready = false;
var smallest = 9999;
var num = 0;

// Read in data file, calculating results when read. 
fs.readFile('weather.dat', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  lines = data.split('\n');
  show();
  return;
});

function show () {
  console.log('\nLines read from data file: ' + lines.length);
  for (var i = 2; i < lines.length-1; i++) {    // Loop through all lines, skipping header and blank line
  	var vals = lines[i].trim().split(/\s+/);    // divide fields on one or more spaces
    high = vals[1].replace (/[!@#$%^&*]/g, ''); // get high temp, cleaning any strange chars
    low = vals[2].replace (/[!@#$%^&*]/g, '');  // get low temp

  	//console.log (vals[0] + ',' + high + ',' + low);
    var diff = parseInt(high) - parseInt(low);
    if (diff < smallest) {
      smallest = diff;     // record new smallest difference
      num = vals[0];       // record line number
    }

  }
  console.log ("Lowest spread was day " + num + " with a temp diff of " + smallest);
}  
