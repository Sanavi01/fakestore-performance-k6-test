import { sleep, check } from 'k6';
import { BASE_URL, thresholds } from '../config/config.js';
import { getProducts } from '../services/api.js';
import { htmlReport } from '../libs/k6-reporter.js';

export const options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 50 },
        { duration: '20s', target: 0 },
      ],
    },
  },
  thresholds,
};

export default function () {
  let res = getProducts(BASE_URL);

  check(res, {
    'GET 200': (r) => r.status === 200,
    'response time < 800ms': (r) => r.timings.duration < 800,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    stdout: JSON.stringify({
      checks_passed: data.metrics.checks.passes,
      checks_failed: data.metrics.checks.fails,
      avg_duration: data.metrics.http_req_duration.avg,
      p95: data.metrics.http_req_duration['p(95)'],
    }, null, 2),

    'results/stress-summary.json': JSON.stringify(data, null, 2),
    'results/stress-summary.html': htmlReport(data),
  };
}