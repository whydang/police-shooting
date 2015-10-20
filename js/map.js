// Function to draw your map
var drawMap = function() {

  	// Create map and set view
	var map = L.map('container').setView([35, -100], 4);

  	// Create a tile layer variable using the appropriate url
  	// Add the layer to your map
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
 
  	// Execute your function to get data
  	getData();
}

// Function for getting data
var getData = function() {
	console.log("hello");
	// Execute an AJAX request to get the data in data/response.js
	$.ajax({
	  url: 'data/response.json',
	  data: 'hmm',
	  success: function(data, jqXHR, textStatus) {
	  	alert('AJAX call complete ' + data[0].County);
	  },
	  dataType: 'json'
	});

  	// When your request is successful, call your customBuild function
  	customBuild();

}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map
	var Unkown = new L.LayerGroup([]);
	var White = new L.LayerGroup([]);
	var Black = new L.LayerGroup([]);
	var Asian = new L.LayerGroup([]);
	var Indian = new L.LayerGroup([]);
	var Hawaiian = new L.LayerGroup([]);

	for (var i = 0; i < data.length; i++) {
		var value = data[i].Race;
		alert(value);
	}

	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}


