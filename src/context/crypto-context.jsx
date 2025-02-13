import {createContext, useEffect, useState} from "react";
import {AssetsData, FakeCryptoData} from "../Api.js";
import {percentDifference} from "../utils.js";

export const CryptoContext = createContext({
        assets: [],
        crypto: [],
        loading: false,
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState();
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(()=>{
        async function preload(){
            setLoading(true);
            const assets = await AssetsData();
            const { result } = await FakeCryptoData();

            setAssets(assets.map((asset) =>{
                    const coin = result.find((c) => c.id === asset.id)

                    return {
                        grow: coin.price > asset.price,
                        growPercent: percentDifference(coin.price, asset.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2),
                        ...asset,
                    }
                })
            );
            setCrypto(result);
            setLoading(false);
        }
        preload();
    }, [])



    return <CryptoContext.Provider value={{loading, crypto, assets}}>{children}</CryptoContext.Provider>
}