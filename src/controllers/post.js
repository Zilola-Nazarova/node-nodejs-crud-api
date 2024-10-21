import { v4 as uuidv4 } from 'uuid';
import sendResponse from '../sendResponse.js';
import database from '../server.js';
import { CONTENT_TYPE_JSON } from '../contentTypes.js';

const handlePostRequest = (req, res, parsedUrl) => {
  if (parsedUrl.path !== '/users') {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    return;
  }

  let requestBody = '';

  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(requestBody);
      userData.id = uuidv4();
      const { id, username, age, hobbies } = userData;
      const user = database.createUser(id, username, age, hobbies);
      sendResponse(res, 201, CONTENT_TYPE_JSON, user);
    } catch (error) {
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid request body' });
    }
  });
};

export default handlePostRequest;
