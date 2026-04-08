export const BASE_URL = __ENV.BASE_URL || 'https://automationexercise.com/api';

export const thresholds = {
  http_req_duration: ['p(95)<800'],
  http_req_failed: ['rate<0.01'],
};