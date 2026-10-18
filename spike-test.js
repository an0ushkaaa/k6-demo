import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },    // normal
    { duration: '10s', target: 200 },  // sudden spike
    { duration: '10s', target: 5 },    // back to normal
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}