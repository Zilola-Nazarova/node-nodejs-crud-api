import sendResponse from "../sendResponse.js";
import users from "../data.js";
import { CONTENT_TYPE_JSON } from "../contentTypes.js";

// 204 if the record is found and deleted
// 400 and message if userId is invalid (not uuid)
// 404 and message if record with id === userId doesn't exist

const handleDeleteRequest = (req, res, parsedUrl) => {
  const userId = parseInt(parsedUrl.path.split('/').pop());
  const userIndex = users.findIndex(p => p.id === userId);

  if (userIndex !== -1) {
    // Remove the user and return JSON response with the deleted user
    const deletedUser = users.splice(userIndex, 1)[0];
    sendResponse(res, 200, CONTENT_TYPE_JSON, deletedUser);
  } else {
    // Return a 404 response if the user is not found
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
  }
};

export default handleDeleteRequest;
