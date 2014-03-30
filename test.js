// Solution to Kata 4, part I:  http://codekata.com/kata/kata04-data-munging/


// Initialize some useful stuff:
var fs = require('fs');    // Node file IO lib, http://nodejs.org/api/fs.html
var data;
var ready = false;
var smallest = 9999, largest = 0;
var num_small = num_large = 0;
var name_small;

// Constants
var HIGH_VALUE = 1;
var LOW_VALUE = 2;
var FOR = 6;
var AGAINST = 8;


// Read in the weather data file, calculating results when read. 
fs.readFile('weather.dat', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var lines = split_lines (data);
  show_weather (lines);
  ready = true;
});


// Read in the football data file, calculating results when read. 
fs.readFile('football.dat', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var lines = split_lines (data);
  smallest = 9999;
  show_football (lines);
  return;
});


function show_weather (lines) {
  console.log('\nWeather, Lines read from data file: ' + lines.length);

  for (var i = 2; i < lines.length-1; i++) {    // Loop through all lines, skipping header and blank line
    var vals = split_fields (lines[i]);
    var high = get_high (vals);
    var low = get_low (vals);

    var diff = temp_diff (high, low);
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
  return;
}  


function show_football (lines) {
  console.log('\nFootball, Lines read from data file: ' + lines.length);

  for (var i = 1; i < lines.length-1; i++) {    // Loop through all lines, skipping header line
    if (lines[i].indexOf('-----') > -1) continue; // skip over line with all dashes
    var vals = split_fields (lines[i]);
    var val_f = get_for (vals);
    var val_a = get_against (vals);

    var diff = point_diff (val_f, val_a);
    if (diff < smallest) {
      smallest = diff;     // record new smallest difference
      name_small = vals[1];       // record line number
    }
  }
  console.log ("Team with lowest spread of " + smallest + " points was " + name_small);
  return;
}  


// 
// Helper functions
//

function temp_diff (high, low) {
  return parseInt(high) - parseInt(low);
}

function get_scrubbed_value (vals, idx) {
  return vals[idx].replace (/[!@#$%^&*]/g, '');
}

function get_high (vals) {
  return get_scrubbed_value (vals, HIGH_VALUE);
}

function get_low (vals) {
  return get_scrubbed_value (vals, LOW_VALUE);
}

function split_lines (data) {
  return data.split('\n');
}

function split_fields (line) {
  return line.trim().split(/\s+/);
}

function get_for(vals) {
  return vals[FOR];
}

function get_against(vals) {
  return vals[AGAINST];
}

function point_diff (val_f, val_a) {
  return Math.abs(parseInt(val_f) - parseInt(val_a));
}