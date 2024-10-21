import http from "node:http";
import url from "node:url";
import 'dotenv/config';
import handleDeleteRequest from "./controllers/delete.js";
import handleGetRequest from "./controllers/get.js";
import handlePostRequest from "./controllers/post.js";
import handlePutRequest from "./controllers/put.js";
import sendResponse from "./sendResponse.js";
import { CONTENT_TYPE_JSON } from "./contentTypes.js";

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Handle different HTTP methods and endpoints
  if (req.method === 'GET') {
    // Call the function to handle GET requests
    handleGetRequest(req, res, parsedUrl);
  } else if (req.method === 'POST' && parsedUrl.path === '/user') {
    // Call the function to handle POST requests
    handlePostRequest(req, res);
  } else if (req.method === 'PUT' && parsedUrl.path.startsWith('/user/')) {
    // Call the function to handle PUT requests
    handlePutRequest(req, res, parsedUrl);
  } else if (req.method === 'DELETE' && parsedUrl.path.startsWith('/user/')) {
    // Call the function to handle DELETE requests
    handleDeleteRequest(req, res, parsedUrl);
  } else { 
    // Return a 404 response if the method is not allowed
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
});

server.listen(PORT, () => {
  console.log(`User server listening on ${PORT}`);
});
