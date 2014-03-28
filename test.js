// Solution to Kata 4, part I:  http://codekata.com/kata/kata04-data-munging/


// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var data;
var ready = false;
var smallest = 9999, largest = 0;
var num_small = num_large = 0;

// Read in data file, calculating results when read. 
fs.readFile('weather.dat', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var lines = data.split('\n');
  show(lines);
  return;
});

function show (lines) {
  console.log('\nLines read from data file: ' + lines.length);
  for (var i = 2; i < lines.length-1; i++) {    // Loop through all lines, skipping header and blank line
    var vals = lines[i].trim().split(/\s+/);    // divide fields on one or more spaces
    var high = vals[1].replace (/[!@#$%^&*]/g, ''); // get high temp, cleaning any strange chars
    var low = vals[2].replace (/[!@#$%^&*]/g, '');  // get low temp

    //console.log (vals[0] + ',' + high + ',' + low);
    var diff = parseInt(high) - parseInt(low);
    if (diff < smallest) {
      smallest = diff;     // record new smallest difference
      num_small = vals[0];       // record line number
    }
    if (diff > largest) {
      largest = diff;
      num_large = vals[0];
    }

  }
  console.log ("Lowest spread was day " + num_small + " with a temp diff of " + smallest);
  console.log ("Highest spread was day " + num_large + " with a temp diff of " + largest);
}  
