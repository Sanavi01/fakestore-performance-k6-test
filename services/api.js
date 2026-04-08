import http from 'k6/http';

import { BASE_URL, LOGIN_PATH } from '../config/config.js';

export function parseCsv(text) {
  const rows = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/);

  if (!rows.length || !rows[0]) {
    return [];
  }

  return rows
    .slice(1)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const [username, password] = row.split(',').map((value) => value.trim());

      return { username, password };
    })
    .filter((credential) => credential.username && credential.password);
}

export function loadCredentials(filePath) {
  return parseCsv(open(filePath));
}

export function login(username, password, baseUrl = BASE_URL) {
  return http.post(
    `${baseUrl}${LOGIN_PATH}`,
    JSON.stringify({ username, password }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}