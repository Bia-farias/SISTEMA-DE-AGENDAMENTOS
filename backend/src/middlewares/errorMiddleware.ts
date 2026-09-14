import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';
import { sendError } from '../utils/response.js';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return sendError(res, 'Dados inválidos', 422, errors);
  }

  // Erros do Prisma
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    if (prismaError.code === 'P2002') {
      const target = (prismaError.meta?.target as string[])?.join(', ') || 'campo único';
      return sendError(res, `Já existe um registro com este valor para: ${target}`, 409);
    }
    if (prismaError.code === 'P2025') {
      return sendError(res, 'Registro não encontrado no banco de dados', 404);
    }
  }

  console.error('💥 Erro não tratado:', err);

  return sendError(
    res,
    'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
    500
  );
}
