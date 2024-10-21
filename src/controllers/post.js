import { v4 as uuidv4 } from 'uuid';
import sendResponse from "../sendResponse.js";
import users from "../data.js";
import { CONTENT_TYPE_JSON } from "../contentTypes.js";

// 201 and newly created record
// 400 and  message if request body does not contain required fields

const handlePostRequest = (req, res) => {
  let requestBody = '';

  req.on('data', (chunk) => {
    // Accumulate the request body
    requestBody += chunk;
  });

  req.on('end', () => {
    // Parse the request body and add the new user
    const user = JSON.parse(requestBody);
    user.id = uuidv4();
    users.push(user);

    // Return JSON response with the newly added user
    sendResponse(res, 201, CONTENT_TYPE_JSON, user);
  });
};

export default handlePostRequest;
