const sendResponse = (res, statusCode, contentType, data) => {
  res.writeHead(statusCode, contentType);
  res.end(JSON.stringify(data));
};

export default sendResponse;
