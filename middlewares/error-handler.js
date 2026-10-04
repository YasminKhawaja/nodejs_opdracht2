// middlewares/error-handler.js
// Geeft altijd JSend-JSON terug: 4xx = "fail", 5xx = "error"
export default (err, req, res, next) => {
  const status = err.status || err.statusCode || 500

  if (status >= 500) {
    return res.status(status).json({ status: 'error', message: err.message })
  }

  res.status(status).json({ status: 'fail', message: err.message, data: null })
}
