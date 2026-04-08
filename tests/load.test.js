import { sleep, check } from 'k6';
import { BASE_URL, thresholds } from '../config/config.js';
import { getProducts, createPost } from '../services/api.js';
import { customLatency, errorRate } from '../utils/metrics.js';
import { htmlReport } from '../libs/k6-reporter.js';

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '20s', target: 10 },
        { duration: '40s', target: 10 },
        { duration: '20s', target: 0 },
      ],
    },
  },
  thresholds,
};

export default function () {

  // flujo de usuario
  let res1 = getProducts(BASE_URL);

  check(res1, {
    'GET 200': (r) => r.status === 200,
  });

  customLatency.add(res1.timings.duration);
  errorRate.add(res1.status !== 200);

  sleep(1);

  let res2 = createPost();

  check(res2, {
    'POST 201': (r) => r.status === 201,
  });

  customLatency.add(res2.timings.duration);
  errorRate.add(res2.status !== 201);

  sleep(2);
}

export function handleSummary(data) {
  return {
    stdout: JSON.stringify({
      checks: data.metrics.checks,
      http_req_duration: data.metrics.http_req_duration,
    }, null, 2),

    'results/load-summary.json': JSON.stringify(data, null, 2),
    'results/load-summary.html': htmlReport(data),
  };
}