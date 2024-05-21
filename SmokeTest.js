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

    sleep(1);
};

export const options = {
    vus: 5,
    duration: '1m',
    thresholds: {
        http_req_failed: [{
            threshold: 'rate == 0',
            abortOnFail: true,
        }],

        http_req_duration: [{
            threshold : 'avg < 100',
            abortOnFail: true,
        }],
    }


};


