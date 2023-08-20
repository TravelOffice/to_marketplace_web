import jwtDecode from 'jwt-decode';

// eslint-disable-next-line import/prefer-default-export
export function isTokenExpired(token: string | null) {
  if (!token) {
    return true;
  }
  const decodedToken = jwtDecode(token) as { exp: number };
  return decodedToken.exp < Date.now() / 1000;
}
