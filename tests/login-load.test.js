import { check } from 'k6';
import { BASE_URL, CREDENTIALS_FILE, LOGIN_SCENARIO, thresholds } from '../config/config.js';
import { login, loadCredentials } from '../services/api.js';
import { loginLatency, loginErrorRate } from '../utils/metrics.js';
import { htmlReport } from '../libs/k6-reporter.js';

const credentials = loadCredentials(CREDENTIALS_FILE);

if (!credentials.length) {
  throw new Error(`No credentials found in ${CREDENTIALS_FILE}`);
}

let credentialIndex = 0;

export const options = {
  scenarios: {
    login_load: {
      executor: 'constant-arrival-rate',
      rate: LOGIN_SCENARIO.rate,
      timeUnit: LOGIN_SCENARIO.timeUnit,
      duration: LOGIN_SCENARIO.duration,
      preAllocatedVUs: LOGIN_SCENARIO.preAllocatedVUs,
      maxVUs: LOGIN_SCENARIO.maxVUs,
    },
  },
  thresholds,
};

function getToken(response) {
  try {
    const body = response.json();
    return body ? body.token : null;
  } catch {
    return null;
  }
}

export function setup() {
  const validCredentials = [];

  for (const credential of credentials) {
    const response = login(credential.username, credential.password, BASE_URL);
    const token = getToken(response);

    if (__ENV.DEBUG_SETUP === '1') {
      console.log(`${credential.username}: status=${response.status} body=${response.body}`);
    }

    if (response.status >= 200 && response.status < 300 && token) {
      validCredentials.push(credential);
    }
  }

  if (!validCredentials.length) {
    throw new Error(`No valid credentials found in ${CREDENTIALS_FILE}`);
  }

  return { validCredentials };
}

export default function (data) {
  const { validCredentials } = data;
  const credential = validCredentials[credentialIndex % validCredentials.length];
  credentialIndex += 1;

  const response = login(credential.username, credential.password, BASE_URL);
  loginLatency.add(response.timings.duration);

  const token = getToken(response);
  const requestOk = check(response, {
    'login status is 2xx': (res) => res.status >= 200 && res.status < 300,
    'login returns token': () => Boolean(token),
  });

  loginErrorRate.add(!requestOk);
}

export function handleSummary(data) {
  return {
    stdout: JSON.stringify(
      {
        http_req_duration: data.metrics.http_req_duration,
        http_req_failed: data.metrics.http_req_failed,
        checks: data.metrics.checks,
      },
      null,
      2
    ),
    'results/login-summary.json': JSON.stringify(data, null, 2),
    'results/login-summary.html': htmlReport(data),
  };
}
