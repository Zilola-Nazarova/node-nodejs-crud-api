import sendResponse from "../sendResponse.js";
import users from "../data.js";
import { CONTENT_TYPE_JSON, CONTENT_TYPE_HTML } from "../contentTypes.js";

// 200 and all users records
// 200 and record with id === userId if it exists
// 400 and message if userId is invalid (not uuid)
// 404 and message if record with id === userId doesn't exist

const handleGetRequest = (req, res, parsedUrl) => {
  if (parsedUrl.path === '/') {
    // Return HTML response for the home page
    sendResponse(res, 200, CONTENT_TYPE_HTML, `<b>Users <a href = '/users'>list</a> page</b>`);
  } else if (parsedUrl.path === '/users') {
    // Return JSON response with the list of users
    sendResponse(res, 200, CONTENT_TYPE_JSON, users);
  } else if (parsedUrl.path.startsWith("/users")) {
    // Get user by id. A user can be fetched using path param or query param
    // const userId = parsedUrl.query.id || parseInt(parsedUrl.path.split('/').pop());
    const regexExp = /^user\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}(?:\/.*)?$/i;
    const userId = parseInt(parsedUrl.path.split('/').pop());
    const isUuid = regexExp.test(userId);
    if (!isUuid) {
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Enpoint UUID is not valid' });
    }
    const user = getUserById(userId);
    if (user) {
      // Return JSON response with the user details
      sendResponse(res, 200, CONTENT_TYPE_JSON, user);
    } else {
      // Return a 404 response if the user is not found
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
    }
  } else {
    // Return a 404 response if the endpoint is not found
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

// Function to get a user by its id from the user data store
const getUserById = (userId) => {
  return users.find(user => user.id === parseInt(userId));
};

export default handleGetRequest;
