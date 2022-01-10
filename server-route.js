// A BASIC Node server
// Routing Requests

const http = require("http");
const url = require("url");
const { v4: uuidv4 } = require('uuid');
var NotifyClient = require('notifications-node-client').NotifyClient

const hostname = 'localhost'
const port = 3000

const apiKey = "testapi-18c4ce38-e89f-47c3-afdd-798121f558be-3cd3d5d2-e182-44fb-8eca-8645940c57f7"
const notifyClient = new NotifyClient('https://api.notification.canada.ca', apiKey)

const server = http.createServer(function(req, res) {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path);
  
  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();
 
  req.on("data", function() {
    console.log("got some data");
    
  });
  req.on("end", function() {
    console.log("send a response");
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method
    };
  
    route(data, res);
  });
});

server.listen(port, hostname, () => {
  console.log("Listening on port 1234");
});

let routes = {
  kenny: function(data, res) {
    const templateId = '65a9fd28-bc8e-4527-b389-2cc3988eab90'
const phoneNumber = '+16133234221'
const personalisation = {
    "var": "This is some content with a defined variable within the template."
}
const reference = uuidv4()

notifyClient
  .sendSms(templateId, phoneNumber, {
    personalisation: personalisation,
    reference: reference
  })
  .then(response => console.log(response))
  .catch(err => console.error(err))

    let payload = {
      name: "Kenny"
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  cartman: function(data, res) {
    // this function called if the path is 'cartman'
    let payload = {
      name: "Cartman"
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  "kenny/is/mysterion": function(data, res) {
    //this function called if path is 'kenny/is/mysterion'
    let payload = {
      name: "Mysterion",
      enemy: "The Coon",
      today: +new Date()
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.write(payloadStr);
    res.end("\n");
  },
  notFound: function(data, res) {
    //this one gets called if no route matches
    let payload = {
      message: "File Not Found",
      code: 404
    };
    let payloadStr = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(404);

    res.write(payloadStr);
    res.end("\n");
  }
};