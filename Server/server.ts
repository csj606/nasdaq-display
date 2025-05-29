import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const finnhub = require('finnhub');

dotenv.config()
const app = express()
const port = process.env.PORT || 9090
app.use(cors())


type FinnhubResponse = {
    c: number,
    o: number
}

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

app.get("/quote", async (req, res) => {
    let result : number = -1
    console.log(req.query)
    let ticker: string = req.query.ticker as string
    let data = await getQuote(ticker)
    if(data !== null){
        result = data.c
    }
    console.log(`Done with ${ticker}`)
    res.send(JSON.stringify(result))
})

app.listen(port, () => {
    console.log("Proxy server online")
})