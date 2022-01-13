import * as http from "http";

const hostname: string = "127.0.0.1"; 
const port: number = 3000;
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);


async function connect (){
await client.connect();
console.log("Connected successfully to server");
}
connect();
const collection = client.db().collection('collection');

const server: http.Server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*"); 
    let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
      case "/concertEvents":
        if(request.method === "GET"){
          let result = await collection.find({}).toArray();
          response.end(JSON.stringify(result));
        }
        else if(request.method === "POST"){
          request.setEncoding("utf8");
          let body = "" 
          await request.on("data", (data) => {
            body += data;
          });
          try {
          let result = await collection.insertOne({
            interpret: JSON.parse(body).interpret,
            price: JSON.parse(body).price,
            dateAndTime: JSON.parse(body).dateAndTime
          });
          response.end(JSON.stringify(result));
          } catch (error) {
            response.end(JSON.stringify(error));
          }
        }
        break;
      default:
        response.statusCode = 404;
    }
    response.end();
  }
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});