var client = require("./connection.js");
var tripsJson = require("./trips_new.json");
var bulkTripsArray = [];

var makeBulkArray = function(trips, callback) {
  console.log("***** Ejecutando makeBulkArray *****");
  for (var current in trips) {
    bulkTripsArray.push(
      {
        index: {
          _index: "trips_events_embedded",
          _id: trips[current].trip_id
        }
      },
      {
        "trip_id": trips[current]["trip_id"],
        "driver_id": trips[current]["driver_id"],
        "trip_path": trips[current]["trip_path"],
        "trip_events": trips[current]["trip_events"],
      }
    );
  }
  callback(bulkTripsArray);
};

var indexTripsBulk = function(bulkArr, callback) {
  console.log("***** Ejecutando indexTripsBulk *****");
  console.log(bulkArr);
  client.bulk(
    {
      maxRetries: 5,
      index: "trips_events_embedded",
      body: bulkArr
    },
    function(err, resp, status) {
      if (err) {
        console.log(err);
      } else {
        callback(resp.items);
      }
    }
  );
};

makeBulkArray(tripsJson, function(response) {
  console.log("Bulk trips: \n");
  console.log("--------------------------------");
  console.log(tripsJson);
  console.log("--------------------------------");
  console.log(JSON.stringify(response, null, 2));
  console.log("despues de stringify");
  indexTripsBulk(response, function(response) {
    console.log(response);
  });
});
