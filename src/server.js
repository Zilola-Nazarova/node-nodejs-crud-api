import http from 'node:http';
import url from 'node:url';
import 'dotenv/config';
import handleDeleteRequest from './controllers/delete.js';
import handleGetRequest from './controllers/get.js';
import handlePostRequest from './controllers/post.js';
import handlePutRequest from './controllers/put.js';
import sendResponse from './sendResponse.js';
import { CONTENT_TYPE_JSON } from './contentTypes.js';
import Database from './database.js';

const PORT = process.env.PORT;
const database = new Database();

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = url.URL(req.url, true);

    if (req.method === 'GET') {
      handleGetRequest(req, res, parsedUrl);
    } else if (req.method === 'POST') {
      handlePostRequest(req, res, parsedUrl);
    } else if (req.method === 'PUT') {
      handlePutRequest(req, res, parsedUrl);
    } else if (req.method === 'DELETE') {
      handleDeleteRequest(req, res, parsedUrl);
    } else {
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
    }
  } catch (error) {
    sendResponse(res, 500, CONTENT_TYPE_JSON, {
      error: `Unexpected error occured.
      Please open an issue in project repo https://github.com/Zilola-Nazarova/node-nodejs-crud-api`
    });
  }
});

server.listen(PORT, () => {
  console.log(`User server listening on ${PORT}`);
});

export default database;
