import sendResponse from "../sendResponse.js";
import database from "../server.js";
import { CONTENT_TYPE_JSON } from "../contentTypes.js";

// 200 and updated record
// 400 and message if userId is invalid (not uuid)
// 404 and message if record with id === userId doesn't exist

const handlePutRequest = (req, res, parsedUrl) => {
  if (!parsedUrl.path.startsWith('/users/') || parsedUrl.path.split('/').length !== 3) {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    return;
  }

  let requestBody = '';

  req.on('data', (chunk) => {
    // Accumulate the request body
    requestBody += chunk;
  });

  req.on('end', () => {
    // Parse the request body and update the existing user
    const updatedUser = JSON.parse(requestBody);

    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const userId = parsedUrl.path.split('/').pop();
    const isUuid = regexExp.test(userId);

    if (!isUuid) {
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Endpoint UUID is not valid' });
      return;
    }

    const userIndex = database.getUsers().findIndex(p => p.id === userId);

    if (userIndex !== -1) {
      // Update the user and return JSON response with the updated user
      try {
        const { username, age, hobbies }  = updatedUser;
        const user = database.updateUser(userId, username, age, hobbies);
        sendResponse(res, 200, CONTENT_TYPE_JSON, user);
      } catch (error) {
        sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid request body' });
      }
    } else {
      // Return a 404 response if the user is not found
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
    }
  });
};

export default handlePutRequest;
