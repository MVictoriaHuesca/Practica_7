/*
 * @autor1 = Eduardo García Rivas
 * @autor2 = María Victoria Huesca Peláez
 */

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
        { duration: '2m', target: 3926 }, // rampa muy rápida
        { duration: '2m', target: 0 }, // baja muy rapid0
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate < 0.5',
            abortOnFail: true,
        }]
    }
};