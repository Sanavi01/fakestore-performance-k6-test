import { Trend, Rate } from 'k6/metrics';

export const customLatency = new Trend('custom_latency');
export const errorRate = new Rate('error_rate');