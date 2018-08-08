class NoResultsFoundError extends Error  {
  errorCode = 106;
  httpStatus = 401;
  userMessage = "No results found";
}

export default NoResultsFoundError;
