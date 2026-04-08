import { Trend, Rate } from 'k6/metrics';

export const loginLatency = new Trend('login_latency');
export const loginErrorRate = new Rate('login_error_rate');