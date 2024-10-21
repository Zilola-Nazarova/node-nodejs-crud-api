import sendResponse from "../sendResponse.js";
import users from "../data.js";
import { CONTENT_TYPE_JSON } from "../contentTypes.js";

// 200 and updated record
// 400 and message if userId is invalid (not uuid)
// 404 and message if record with id === userId doesn't exist

const handlePutRequest = (req, res, parsedUrl) => {
  let requestBody = '';

  req.on('data', (chunk) => {
    // Accumulate the request body
    requestBody += chunk;
  });

  req.on('end', () => {
    // Parse the request body and update the existing user
    const updatedUser = JSON.parse(requestBody);
    const userId = parseInt(parsedUrl.path.split('/').pop());
    const userIndex = users.findIndex(p => p.id === userId);

    if (userIndex !== -1) {
      // Update the user and return JSON response with the updated user
      users[userIndex] = { ...users[userIndex], ...updatedUser, id: userId };
      sendResponse(res, 200, CONTENT_TYPE_JSON, users[userIndex]);
    } else {
      // Return a 404 response if the user is not found
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
    }
  });
};

export default handlePutRequest;
