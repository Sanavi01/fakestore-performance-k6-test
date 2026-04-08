export const BASE_URL = __ENV.BASE_URL || 'https://fakestoreapi.com';
export const LOGIN_PATH = __ENV.LOGIN_PATH || '/auth/login';
export const CREDENTIALS_FILE = __ENV.CREDENTIALS_FILE || '../data/credentials.csv';

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const LOGIN_SCENARIO = {
  rate: toNumber(__ENV.LOGIN_RATE, 25),
  timeUnit: __ENV.LOGIN_RATE_UNIT || '1s',
  duration: __ENV.LOGIN_DURATION || '1m',
  preAllocatedVUs: toNumber(__ENV.LOGIN_PRE_ALLOCATED_VUS, 80),
  maxVUs: toNumber(__ENV.LOGIN_MAX_VUS, 150),
};

export const thresholds = {
  http_req_duration: ['p(95)<1500'],
  http_req_failed: ['rate<0.03'],
  http_reqs: ['rate>=20'],
};