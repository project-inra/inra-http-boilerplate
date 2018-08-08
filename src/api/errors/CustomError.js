class CustomError extends Error {
  errorCode = 100;
  httpStatus = 400;
  userMessage = "Im Custom Error";
}

export default CustomError;
