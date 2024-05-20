/*
Comprueba si el sistema es capaz de soportar una carga de estrés con el 80% de VUs del 
punto de rotura sin executors en una rampa de 3 minutos, 3 minutos de mantenimiento de 
los VUs, y una bajada a 0 VUs tras 2 minutos. En este caso, las peticiones fallidas 
deben ser inferiores a 1%, y el promedio de la duración de las peticiones 
(http_req_duration) debe de ser inferior a 1000ms, en cualquier otro caso se aborta el 
test. En este caso, al ser un tramo pequeño, no es recomendable utilizar executors.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

    stages: [
        { duration: '3m', target: 8000 }, 
        { duration: '3m', target: 8000 }, 
        { duration: '2m', target: 0 }, 
    ],

    thresholds: {
        http_req_failed: [{             
            threshold: 'rate<=0.01',
            abortOnFail: true,          
        }],
        http_req_duration: [{
            threshold: 'avg < 1000',
            abortOnFail: true,          
        }]
    }
}

export default function () {
    const url = 'http://localhost:8080/medico/1'
    http.get(url);
    sleep(1);
}

