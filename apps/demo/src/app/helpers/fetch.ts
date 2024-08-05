import { environment } from '../../environments/environment';

let baseURL = environment.baseUrl;

const fetchSimple = (endpoint:string, data:any, method:string = 'GET') => {
    const url = `${ baseURL }/${endpoint}/`;
console.log("URL: ", url);

    if ( method === 'GET' ){
        return fetch( url );
    }

    return fetch( url, {
        method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
}

const fetchToken = (endpoint:string, data:any, method:string = 'GET') => {
    let url = `${ baseURL }/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {        
        console.log("Ejecutamos el fetch sin token");        
        if(data){
            url =  `${url}?${data}`
            console.log(url);
        }
        
        return fetch( url, {
            method,
            headers: { 'x-token': token }
        });
    }

    return fetch( url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify( data ),
    });
}

export {
    fetchSimple,
    fetchToken
}