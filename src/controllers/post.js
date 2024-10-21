import { v4 as uuidv4 } from 'uuid';
import sendResponse from "../sendResponse.js";
import database from "../server.js";
import { CONTENT_TYPE_JSON } from "../contentTypes.js";

// 201 and newly created record
// 400 and  message if request body does not contain required fields

const handlePostRequest = (req, res, parsedUrl) => {
  if (parsedUrl.path !== '/users') {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    return;
  }
  
  let requestBody = '';

  req.on('data', (chunk) => {
    // Accumulate the request body
    requestBody += chunk;
  });

  req.on('end', () => {
    try {
      // Parse the request body and add the new user
      const userData = JSON.parse(requestBody);
      userData.id = uuidv4();
      const { id, username, age, hobbies }  = userData;
      const user = database.createUser(id, username, age, hobbies);
      // Return JSON response with the newly added user
      sendResponse(res, 201, CONTENT_TYPE_JSON, user);
    } catch (error) {
      console.log(error.message);
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid request body' });
    }
  });
};

export default handlePostRequest;
