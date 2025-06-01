import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const finnhub = require('finnhub');

dotenv.config()
const app = express()
let port: number = 9090
if(typeof process.env.PORT !== 'undefined' && typeof process.env.PORT !== 'string'){
    port = process.env.PORT
}
app.use(cors())


type FinnhubResponse = {
    c: number,
    o: number
}

let priceJSON: {[key: string]: any} = {}
let pricesUpdating = false

const nasdaqStockTickers: string[] = ["MSFT", "AAPL", "NVDA", "AMZN", "AVGO", "META", "NFLX",
    "TSLA", "COST", "GOOG", "TMUS", "PLTR", "CSCO", "LIN", "ISRG", "INTU", "PEP", "AMD", "ADBE", 
    "TXN", "BKNG", "QCOM", "AMGN", "HON", "AMAT", "CMCSA", "GILD", "PANW", "MELI", "ADP", 
    "VRTX", "ADI", "APP", "LRCX", "MU", "KLAC", "CRWD", "SBUX", "MSTR", "INTC", "CEG", "CTAS",
    "CDNS", "MDLZ", "FTNT", "SNPS", "PDD", "ORLY", "DASH", "MAR", "PYPL", "ASML", "ADSK", "REGN",
    "ROP", "CPRT", "MNST", "ABNB", "CSX", "CHTR", "WDAY", "MRVL", "PAYX", "AEP", "AXON", "NXPI",
    "PCAR", "ROST", "FAST", "KDP", "EXC", "VRSK", "IDXX", "FANG", "CTSH", "CCEP", "AZN", "TTWO",
    "EA", "XEL", "ODFL", "BKR", "ZS", "TEAM", "DDOG", "TTD", "LULU", "GEHC", "KHC", "DXCM", "MCHP",
    "CSGP", "ANSS", "CDW", "WBD", "GFS", "ON", "BIIB", "ARM", "MDB"
];

const getQuote = (symbol: string): Promise<FinnhubResponse> => {
    const api_key = finnhub.ApiClient.instance.authentications['api_key']
    api_key.apiKey = process.env.FINNHUB_API_KEY;
    const finnhubClient = new finnhub.DefaultApi()
    return new Promise((resolve, reject) => {
        finnhubClient.quote(symbol, (error: any, data: FinnhubResponse, response: any) => {
            if (error){
                return reject(error);
            } 
            resolve(data);
        });
    });
};

async function retrievePrices(){
    pricesUpdating = true
    let startTime: number = Date.now()
    for(let i = 0; i < nasdaqStockTickers.length; i++){
        const ticker: string = nasdaqStockTickers[i]
        if (i === 59){
            let interval: number = Date.now() - startTime
            const remainingMinute: number = 60000 - interval 
            await new Promise(resolve => setTimeout(resolve, remainingMinute))
        }
        let result: number  = -1
        console.log(`Retrieving data for ${ticker}`)
        let data = await getQuote(ticker)
        if(data !== null){
            result = data.c
        }
        priceJSON[ticker] = result
    }
    console.log(priceJSON)
    pricesUpdating = false
    
}



app.get("/quotes", async (req, res) => {
    if(!pricesUpdating){
        res.send(JSON.stringify(priceJSON))
    }else{
        await new Promise(resolve => setTimeout(resolve, 80000))
        res.send(JSON.stringify(priceJSON))
    }
})

app.listen(port, '0.0.0.0', () => {
    retrievePrices()
    setInterval(retrievePrices, 600000)
    console.log("Proxy server online")
})