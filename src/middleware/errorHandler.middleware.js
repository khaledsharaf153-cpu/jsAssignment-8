export function globalErrorHandler(error, req, res, next) {
  res.status(error.cause?.statusCode || 500).json({ msg: error.message });
}
