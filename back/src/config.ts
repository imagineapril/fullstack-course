export const config: IConfig = {
  passwordSaltBytesLength: 10,
  hashPresentation: 'hex' as const,
  hashPasswordIterationsCount: 10,
  hashPasswordLength: 32,
  hashAlgorithm: 'sha512',
  jwtAccessSecret: 'yjyu675fRjWr',
  jwtRefreshSecret: 'jflks7879TY',
  jwtAccessValidityPeriod: '5 min',
  jwtRefreshValidityPeriod: '1 day',
  jwtRefreshCookieValidityPeriod: 24 * 60 * 60 * 1000,
  jwtRefreshCookieName: 'refreshToken',
}

export interface IConfig {
  passwordSaltBytesLength: 10,
  hashPresentation: BufferEncoding,
  hashPasswordIterationsCount: 10,
  hashPasswordLength: 32,
  hashAlgorithm: 'sha512',
  jwtAccessSecret: 'yjyu675fRjWr',
  jwtRefreshSecret: 'jflks7879TY',
  jwtAccessValidityPeriod: '5 min',
  jwtRefreshValidityPeriod: '1 day',
  jwtRefreshCookieValidityPeriod: number,
  jwtRefreshCookieName: 'refreshToken',
}