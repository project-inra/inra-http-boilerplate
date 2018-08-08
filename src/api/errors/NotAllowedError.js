class NotAllowedError extends Error {
  errorCode = 101;
  httpStatus = 402;
  userMessage = "Not allowed";
}

export default NotAllowedError;
