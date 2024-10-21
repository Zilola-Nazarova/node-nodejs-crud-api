import sendResponse from '../sendResponse.js';
import database from '../server.js';
import { CONTENT_TYPE_JSON } from '../contentTypes.js';

const handlePutRequest = (req, res, parsedUrl) => {
  if (!parsedUrl.path.startsWith('/users/') || parsedUrl.path.split('/').length !== 3) {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    return;
  }

  let requestBody = '';

  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  req.on('end', () => {
    const updatedUser = JSON.parse(requestBody);
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const userId = parsedUrl.path.split('/').pop();
    const isUuid = regexExp.test(userId);

    if (!isUuid) {
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Endpoint UUID is not valid' });
      return;
    }

    const userIndex = database.getUsers().findIndex(p => p.id === userId);

    if (userIndex !== -1) {
      try {
        const { username, age, hobbies } = updatedUser;
        const user = database.updateUser(userId, username, age, hobbies);
        sendResponse(res, 200, CONTENT_TYPE_JSON, user);
      } catch (error) {
        sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Invalid request body' });
      }
    } else {
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
    }
  });
};

export default handlePutRequest;
