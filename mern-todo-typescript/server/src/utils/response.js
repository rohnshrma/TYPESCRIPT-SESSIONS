// Every API response has the same shape: { success, data, message? }
export const sendResponse = (res, statusCode, success, data, message) => {
  const body = { success, data };
  if (message) body.message = message;
  res.status(statusCode).json(body);
};
