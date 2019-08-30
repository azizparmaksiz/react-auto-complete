/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
 -- This is the product data, you can view it in the file itself for more details
 {
 "_id": "019",
 "isActive": "false",
 "price": "23.00",
 "picture": "/img/products/N16501_430.png",
 "name": "Damage Reverse Thickening Conditioner",
 "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
 "tags": [
 "ojon",
 "conditioner"
 ]
 }
 */
const data = require('./data');
const http = require('http');
var url = require('url');

const hostname = 'localhost';
const port = 3035;

var url = require('url');
/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    restApiHandler(req, res);
}).listen(port);

const restApiHandler = (request, response) => {
    let statusCode=404;
    let responseBody;
    let responseHeaders;

    REST_APIs.forEach(
        restApi => {
            if (restApi.pathName == url.parse(request.url, true).pathname) {
                if (restApi.httpMethod == request.method) {
                    restApi.queryParm = restApi.getQueryParam(request);
                    restApi.responseBody = restApi.generateResponseBody(); // create response body
                    restApi.responseCode = restApi.generateResponseCode(); // generate response code
                    restApi.responseHeaders = restApi.generateResponseHeaders(); // generate response headers
                } else {
                    restApi.responseCode = 405; // generate response code method not allowed
                }

                statusCode = restApi.responseCode;
                if (statusCode==200) {
                    responseBody = restApi.responseBody;
                    responseHeaders = restApi.responseHeaders;
                }
                return;
            }
        }
    );

    response.writeHead(statusCode, responseHeaders);
    response.end(JSON.stringify(responseBody));
}

let SEARCH_API = {
    httpMethod: 'GET',
    pathName: '/search',
    queryParm: null,
    responseBody: [],
    responseCode: null,
    responseHeaders: null,
    getQueryParam: (req) => {
        return url.parse(req.url, true).query.query;
    },
    generateResponseBody: () => {
        let filteredList = SEARCH_API.queryParm ? data.filter(
            item => {
                return item.name.toLowerCase().indexOf(SEARCH_API.queryParm.toLowerCase())>0
            }).map(item => { return item }) : [];

        return filteredList;
    },
    generateResponseCode: () => {
        return 200;
    },
    generateResponseHeaders: () => {
        return { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Method': 'GET, POST'  };
    }
}
const REST_APIs = [SEARCH_API];


console.log(`[Server running on ${hostname}:${port}]`);