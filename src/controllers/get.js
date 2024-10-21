import sendResponse from '../sendResponse.js';
import database from '../server.js';
import { CONTENT_TYPE_JSON, CONTENT_TYPE_HTML } from '../contentTypes.js';

const handleGetRequest = (req, res, parsedUrl) => {
  if (parsedUrl.path === '/') {
    sendResponse(res, 200, CONTENT_TYPE_HTML, "<b>Users <a href = '/users'>list</a> page</b>");
  } else if (parsedUrl.path === '/users') {
    sendResponse(res, 200, CONTENT_TYPE_JSON, database.getUsers());
  } else if (parsedUrl.path.startsWith('/users')) {
    const regexExp = /^user\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}(?:\/.*)?$/i;
    const userId = parsedUrl.path.split('/').pop();
    const isUuid = regexExp.test(userId);

    if (!isUuid) {
      sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Endpoint UUID is not valid' });
      return;
    }

    const user = database.getUser(userId);

    if (user) {
      sendResponse(res, 200, CONTENT_TYPE_JSON, user);
    } else {
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
    }
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

export default handleGetRequest;
