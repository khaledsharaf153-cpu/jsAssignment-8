export function successResponse({ res, statusCode = 200, msg, data }) {
  res.status(statusCode).json({ msg, data });
}
