/*
¿es capaz el sistema de gestionar el 40% de la carga máxima en tan sólo 2 minutos? Comprueba 
que las peticiones fallidas son inferiores a 0.5%. No es recomendable utilizar executors.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
        
    stages: [
        { duration: '1m', target: 4000 }, 
        { duration: '1m', target: 0 }, 
    ],

    thresholds: {
        http_req_failed: [{             
            threshold: 'rate<=0.005'         
        }],
    }
}

export default function () {
    const url = 'http://localhost:8080/medico/1'
    http.get(url);
    sleep(1);
}