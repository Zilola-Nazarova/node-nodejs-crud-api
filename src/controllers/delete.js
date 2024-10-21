import sendResponse from "../sendResponse.js";
import database from "../server.js";
import { CONTENT_TYPE_JSON } from "../contentTypes.js";

const handleDeleteRequest = (req, res, parsedUrl) => {
  if (!parsedUrl.path.startsWith('/users/') || parsedUrl.path.split('/').length !== 3) {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    return;
  }

  const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const userId = parsedUrl.path.split('/').pop();
  const isUuid = regexExp.test(userId);

  if (!isUuid) {
    sendResponse(res, 400, CONTENT_TYPE_JSON, { error: 'Endpoint UUID is not valid' });
    return;
  }

  const userIndex = database.getUsers().findIndex(p => p.id === userId);

  if (userIndex !== -1) {
    const deletedUser = database.removeUser(userIndex);
    sendResponse(res, 204, CONTENT_TYPE_JSON, deletedUser);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'User not found' });
  }
};

export default handleDeleteRequest;
