import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export default () => {
    const url = 'http://localhost:8080/medico/1';

    const res = http.get(url);

    /*let response = http.get('http://localhost:8080/medico/1');

    check(response, {
        'Response code was 200': (res) => res.status == 200
    });*/

    sleep(1);
};

export const options = {
    stages: [
        { duration: '3m', target: 7477 }, // subida
        { duration: '3m', target: 7477 }, // mantenimiento
        { duration: '2m', target: 0 }, // bajada
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate < 0.01',
            abortOnFail: true,
        }],

        http_req_duration: ['avg < 1000'],

        checks: ["rate>=0.95"]
    }
};