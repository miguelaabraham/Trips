var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  // hosts: ["http://192.168.56.1:9200"]
  hosts: ["https://elastic:vBkmWYP531bt5LeigNjgOY1N@125ae5213af84bb6a30970e30ed38649.us-east4.gcp.elastic-cloud.com:9243"]

  /*
  node: 'https://125ae5213af84bb6a30970e30ed38649.us-east4.gcp.elastic-cloud.com:9243',
  auth: {
    username: 'elastic',
    password: 'vBkmWYP531bt5LeigNjgOY1N'
  }
  */

});

module.exports = client;