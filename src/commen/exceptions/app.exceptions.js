export function NotFoundException(
  errmsg = "Not found",
  cause = { statusCode: 404 },
) {
  throw new Error(errmsg, { cause });
}

export function ConflictException(
  errmsg = "Conflict",
  cause = { statusCode: 409 },
) {
  throw new Error(errmsg, { cause });
}

export function UnauthorizedException(
  errMsg = "Unauthorized",
  cause = { statusCode: 401 },
) {
  throw new Error(errMsg, { cause });
}
