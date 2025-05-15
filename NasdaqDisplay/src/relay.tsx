import {restClient} from '@polygon.io/client-js';
const polyon = restClient("");

type Stock =  {
    symbol: string;
    recent_price: number;
};

async function retrieveLastestPrice(ticker: string): Promise<Stock>{
    const data = await polyon.stocks.lastQuote(ticker);
    try{
        if(data.results !== null){
            let priceAPI = data.results?.P!
            let price : number = priceAPI
            return {symbol: ticker, recent_price: price}
        }else{
            return {symbol: "Error with API", recent_price: -1}
        }
    }catch(exception: any){
        console.log(exception)
        return {
            symbol: "Error on data retrieval",
            recent_price: -1
        }
    }
}

