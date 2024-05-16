import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');

    /*let response = http.get('http://localhost:8080/medico/1');

    check(response, {
        'Response code was 200': (res) => res.status == 200
    });*/

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

        //checks: ["rate == 1"]
    }


};


