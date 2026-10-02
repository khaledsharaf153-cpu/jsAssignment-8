export function rotateToken(payload) {
  const accessToken = jwt.sign({}, JWT_ACCESS_SIGNATURE, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
    subject: user.id,
  });

  const refreshToken = jwt.sign({}, JWT_REFRESH_SIGNATURE, {
    expiresIn: JWT_REFRESH_EXPIRES_IN - (Date.now() / 1000 - payload.iat),
    subject: user.id,
  });
  return { accessToken, refreshToken };
}
