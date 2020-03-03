var client = require("./connection.js");

client.indices.putTemplate(
  {
    includeTypeName: false,
    name: "trips_events_embeded_template",
    body: {
      index_patterns: "trips_and_events",
      mappings: {
        properties: {
          trip_id: {
            type: "keyword"
          },
          event_loc: {
            type: "geo_point"
          },
          trip_path: {
            type: "geo_shape"
          }
        }
      }
    }
  },
  function(err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log("Create mapping response: ", resp);
    }
  }
);

/*
client.indices.create(
  {
    index: "trips_events_embedded"
  },
  function(err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      console.log("Create index response: ", resp);
    }
  }
);
*/
