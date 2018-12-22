//Dependencies

var http=require("http");
var url=require("url");
var StringDecoder=require("string_decoder").StringDecoder;

//Setting up the server to respond to all requests

var server=http.createServer(function(request,response){

//URL PARSING AND FETCHING DETAILS

var parsedUrl=url.parse(request.url,true);
var path=parsedUrl.pathname; //fetching the pathname from the url
var trimmedPath=path.replace(/^\/+|\/+$/,""); //trim slashes at beginning and end
var query=parsedUrl.query; //get the query string as an object

//Get the HTTP Method
var method=request.method;

//Get the headers as an object
var headers=request.headers;

//Fetching the payload, if any
var decoder=new StringDecoder("utf-8");
var buffer="";

request.on("data",function(data){
	//IN CASE OF FLOODING DATA
	if(body.length>1e6)
	{request.conncection.destroy();}
	buffer+=decoder.write(data);
});

request.on("end",function(data){

buffer+=decoder.end();
//check the router for a matching path for a handler
var chosenHandler=typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] :handlers.notFound;

//construct the data object 
var data={
	"trimmedPath":trimmedPath,
	"query":query,
	"method": method,
	"headers":headers,
	"payload":buffer
};

//Route the request to the handler specified
chosenHandler(data,function(statusCode,payload){

	 // Use the status code returned from the handler, or set the default status code to 200
	 statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
	 // Use the payload returned from the handler, or set the default payload to an empty object
	 payload = typeof(payload) == 'object'? payload : {"notWelcomeHere":"You are authorised to request /hello only"};

	 // Convert the payload to a strings
	 var payloadString = JSON.stringify(payload);

	// Return the response
	response.setHeader('Content-Type', 'application/json');
	response.writeHead(statusCode);
	response.end(payloadString);
	console.log("Returning this response: ",statusCode,payloadString,data.trimmedPath);
 
 });

});

});

// Start the server
server.listen(3000,function(){
  console.log('The server is listening at port 3000 now....');
});

// Define all the handlers
var handlers = {};

// Sample handler
handlers.hello = function(data,callback){
    callback(200,{'message':'Subscribe to PewDiePie'});
};

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// Define the request router
var router = {
  "hello" : handlers.hello
};