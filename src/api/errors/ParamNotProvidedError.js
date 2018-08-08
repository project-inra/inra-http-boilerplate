class ParamNotProvidedError extends Error  {
  errorCode = 102;
  httpStatus = 400;
  userMessage = "Param not provided";
}

export default ParamNotProvidedError;
