// Function to draw your map
var drawMap = function() {

  	// Create map and set view
	var map = L.map('container').setView([35, -100], 4);

  	// Create a tile layer variable using the appropriate url
  	// Add the layer to your map
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
 
  	// Execute your function to get data
  	getData(map);
}

// Function for getting data
var getData = function(map) {
	// Execute an AJAX request to get the data in data/response.js
	$.ajax({
	  url: 'data/response.json',
	  data: 'hmm',
	  success: function(data) {
	  		customBuild(map, data);
	  },
	  dataType: 'json'
	});

  	// When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function(map, data) {
	// Be sure to add each layer to the map
	var raceObj = {
		"Unknown": new L.LayerGroup([]),
		"White": new L.LayerGroup([]),
		"Black or African American": new L.LayerGroup([]),
		"Asian": new L.LayerGroup([]),
		"American Indian or Alaska Native": new L.LayerGroup([]),
		"Native Hawaiian or Other Pacific Islander": new L.LayerGroup([])
	};

	// used to keep track of data into the table
	var men = 0;
	var whitemen = 0;
	var women = 0;
	var whitewomen = 0;


	for (var i = 0; i < data.length; i++) {
		var raceValue = data[i].Race || "Unknown";
		var longitude = data[i].lng;
		var latitude = data[i].lat;

		var circle = new L.circleMarker([latitude, longitude]).bindPopup(data[i].Summary);
		circle.setStyle({radius: 10});
		if (data[i]["Victim's Gender"] == 'Male') {
			men++;
			if(data[i]["Race"] == 'White') {
				whitemen++;
			}
			circle.setStyle({fillColor: '#001EFF'});

		} else {
			women++;
			if(data[i]["Race"] == 'White') {
				whitewomen++;
			}
			circle.setStyle({fillColor: '#FF0000'});
		}

		circle.addTo(raceObj[raceValue]);
	}

	for(var key in raceObj) {
		raceObj[key].addTo(map);
	}

	// Once layers are on the map, add a leaflet controller that shows/hides layers
	L.control.layers(null, raceObj).addTo(map);

	// overrides data into the table
	var white_male = document.getElementById("white_male");
	var white_female = document.getElementById("white_female");
	var rest_male = document.getElementById("rest_male");
	var rest_female = document.getElementById("rest_female");
	white_male.innerHTML = whitemen;
	white_female.innerHTML = whitewomen;
	rest_male.innerHTML = men - whitemen;
	rest_female.innerHTML = women - whitewomen;
}


