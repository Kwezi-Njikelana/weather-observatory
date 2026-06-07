const errorHandler = (err, req, res, next) => {
  const status = err.status || err.response?.status || 500;
  const message = err.response?.data?.message || err.message || 'Internal server error';

  console.error(`[ErrorHandler] ${status} - ${message}`);

  res.status(status).json({
    error: {
      status,
      message,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = errorHandler;
