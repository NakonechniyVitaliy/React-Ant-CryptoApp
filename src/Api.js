// https://openapi.coinstats.app/

import { cryptoData, cryptoAssets} from './data.js'
import axios from "axios";

const OPENAPI_COIN_STATS_APP_URL = 'https://openapiv1.coinstats.app/coins';
export function RealCryptoData(){
    axios.get('https://openapiv1.coinstats.app/coins',{
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': 'M3JE8kGwCKK3Gr4L62BMKvbZBLMN+Y+zp0JQ0/M+3dM='
        }
    })
        .then(result => {console.log(result.data.result)})
}

export function FakeCryptoData(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve (cryptoData) ;
        }, 1000)
    })
}

export function AssetsData(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve (cryptoAssets) ;
        }, 1000)
    })
}