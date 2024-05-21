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
    scenarios: {
        breakpoint: {
            executor: 'ramping-arrival-rate', // Incrementa la carga exponencial
            preAllocatedVUs: 1000, //VUs alocados inicialmente
            maxVUs: 1e7, //VUs maximo
            stages: [
                { duration: '10m', target: 100000 }, // just slowly ramp-up to a HUGE load
            ]
        }
    },
    thresholds: {
        http_req_failed: [{
            threshold: 'rate < 0.01',
            abortOnFail: true,
        }]
    }
};

