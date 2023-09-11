var http = require('http'), 
    fs = require('fs'), 
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

  //console.log(request);

  // send listing data in the JSON format as a response if a GET request is sent to the '/listings' path
  if (request.method == 'GET' && request.url == '/listings') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(listingData);
    response.end();
  }
  // send a 404 error otherwise
  else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Bad gateway error');
    response.end();
  }

  // Callbacks
   fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err) throw err;
    listingData = data;
  });
};

fs.readFile('listings.json', 'utf8', function(err, data) {

  // Handle errors
  if (err) throw err;
  
   //Save the data in the listingData variable already defined
  listingData = data;

  //Creates the server
  server = http.createServer(requestHandler);
  
  //Start the server
  server.listen(port,function() {
    console.log("Server listening on: http://localhost:8080: " + port);
  });
  console.log("Server started!");
});
