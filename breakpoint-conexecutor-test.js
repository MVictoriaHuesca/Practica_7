/*
Con esta prueba vamos a romper nuestro servidor. En primer lugar, realiza la prueba con un executor de ‘ramping-arrival-rate’
durante 10 minutos y al menos 100000 VUs. Posteriormente realiza una prueba sin executors, es decir, directamente con stages para 
comparar los resultados. ¿Qué diferencias hay? En todos los casos el punto de terminación de tests, y por tanto, de rotura, se 
alcanzará una vez las peticiones fallidas sean mayores al 1%. Apunta bien el número de VUs máximo sin executors ya que lo 
necesitarás para los próximos tests 🔜.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        breakpoint_scenario: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 1000,
            maxVUs: 1e7,
            stages: [{ 
                duration: '10m', 
                target: 100000 
            }],
        }
    },
    thresholds: {
        http_req_failed: [{             //no debe haber peticioneas fallidas
            threshold: 'rate<=0.01',
            abortOnFail: true,          //abortar el test si no se cumple
        }],
    }
}

export default function () {
    const url = 'http://localhost:8080/medico/1'
    
    // send a post request and save response as a variable
    const res = http.get(url);

    // Log the request body
    //console.log(res.body);

    sleep(1);
}