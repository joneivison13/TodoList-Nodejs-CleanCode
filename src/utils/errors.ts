import AppError from "./appErrors";

export const USER_NOT_FOUND = new AppError("User not found", "ERR0014", 404);

export const INVALID_CREDENTIALS = new AppError(
  "E-Mail ou senha incorreta",
  "ERR0015",
  401
);

export const VALIDATION_ERROR = (data?: object) =>
  new AppError("Erro na validação de dados enviados.", "ERR0016", 400, data);

export const USER_ALREADY_CREATED = (data?: object) =>
  new AppError("Usuário já existente na plataforma.", "ERR0017", 400, data);

export const ACCESS_DENIED = new AppError("Acesso negado", "ERR0018", 401);
export const INVALID_TOKEN = new AppError("Token inválido", "ERR0019", 403);
export const EXPIRED_TOKEN = new AppError("Token expirado", "ERR0020", 401);
export const TODO_NOTFOUND = new AppError(
  "To-Do não encontrado",
  "ERR0021",
  404
);
