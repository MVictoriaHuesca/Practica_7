/*
Prueba básica con 5 usuarios virtuales (VU) durante 1 minuto 💨. En esta prueba todas las comprobaciones realizadas (al menos el código HTTP de respuesta) deben de ser positivas, no debe de haber peticiones fallidas, y el promedio de la duración de las peticiones (http_req_duration) debe de ser inferior a 100ms. En cualquier otro caso se aborta el test.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5,                     //5 usuarios virtuales
    duration: '1m',
                 //durante 1 minuto
    thresholds: {
        checks: ["rate==1.0"],          //todas las comprobaciones deben ser positivas
        http_req_failed: [{             //no debe haber peticioneas fallidas
            threshold: 'rate<=0.01',
            abortOnFail: true,          //abortar el test si no se cumple
        }],
        http_req_duration: [{
            threshold: 'avg < 100',
            abortOnFail: true,          //abortar el test si no se cumple
        }]
    },
    
}

export default function () {
    const url = 'http://localhost:8080/medico/1'
    
    http.get(url);

    sleep(1);

}
