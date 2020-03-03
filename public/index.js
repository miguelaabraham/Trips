var algo;
var primer_evento_lat;
var primer_evento_lon;
var trip_path_coords;

$(document).ready(function() {
  // Get references to page elements
  var $tripSearchText = $("#searchTrip");
  var $submitTripSearchButton = $("#submitSearchTrip");
  var $logParagraph = $("#log").hide();
  var $mapPlace = $("#mapid");

  // The searchAPI object contains methods for each kind of request we'll make
  var searchAPI = {
    searchByTrip: function(trip) {
      return $.ajax({
        url: "/search-trip/" + trip,
        type: "GET"
      });
    }
  };

  var handleSubmitTripSearch = function(event) {
    event.preventDefault();

    $mapPlace.empty();

    var searchTerm = $tripSearchText.val().trim();

    searchAPI.searchByTrip(searchTerm).then(function(resp) {
      console.log("pisando variable");

      var data = [];
      data[0] = ["_id", "trip_id", "driver_id"];
      var hitsArray = resp.hits.hits;
      hitsArray.forEach(function(eachTrip) {
        data.push([
          eachTrip._id,
          eachTrip._source["trip_id"],
          eachTrip._source["driver_id"]
        ]);
      });

      var primer_evento = hitsArray[0]._source["trip_events"][0];

      console.log(primer_evento);
      algo = primer_evento.event_type_name;
      var primer_evento_loc = primer_evento.event_loc;
      primer_evento_lat = primer_evento_loc.lat;
      primer_evento_lon = primer_evento_loc.lon;

      trip_path = hitsArray[0]._source["trip_path"];

      trip_path_coords = trip_path.coordinates;

      console.log("en ja " + trip_path_coords);

      algo = primer_evento_lat;

      var tripsTable = makeTable($("#tableDiv"), data);
    });

    // Clear out search field
    $tripSearchText.val("");
  };

  function makeTable(container, data) {
    var table = $("<table/>").addClass("table table-striped");
    $.each(data, function(rowIndex, r) {
      var row = $("<tr/>");
      $.each(r, function(colIndex, c) {
        row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
      });
      table.append(row);
    });

    return container.html(table);
  }

  // Add event listeners to the submit button ok
  $submitTripSearchButton.on("click", handleSubmitTripSearch);
  
});
