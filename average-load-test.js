/*
Prueba una carga promedio del 50% de VUs del punto de rotura con la misma rampa anterior. En 
este caso, las peticiones fallidas deben de ser inferiores a 1%, en cualquier otro caso se 
aborta el test. No es recomendable utilizar executors.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    
    stages: [
        { duration: '3m', target: 5000 }, 
        { duration: '3m', target: 5000 }, 
        { duration: '2m', target: 0 }, 
    ],

    thresholds: {
        http_req_failed: [{             
            threshold: 'rate<=0.01',
            abortOnFail: true,          
        }],
    }
}

export default function () {
    const url = 'http://localhost:8080/medico/1'
    http.get(url);
    sleep(1);
}