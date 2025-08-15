// middlewares/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error(err.stack); // Loga o erro completo no console para debug.

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Ocorreu um erro interno no servidor.',
  });
}