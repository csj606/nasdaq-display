import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { promisify } from "util";
const finnhub = require('finnhub');

dotenv.config()
const app = express()
const port = process.env.PORT || 9090
app.use(cors())

const api_key = finnhub.ApiClient.instance.authentications['api_key']
api_key.api_key = process.env.FINNHUB_API_KEY;
console.log(api_key)
const finnhubClient = new finnhub.DefaultApi()

const stockQuote = promisify(finnhubClient.quote.bind(finnhubClient))

type FinnhubResponse = {
    c: number,
    o: number
}

type websiteRequest = {
    ticker: string
}

app.get("/quote", async (req, res) => {
    let result : number = -1
    console.log(req.query)
    let ticker: string = req.query.ticker as string
    let data = await stockQuote(ticker)
    if(data !== null){
        result = data.c
    }
    console.log(`Done with ${ticker}`)
    res.send(JSON.stringify(result))
})

app.listen(port, () => {
    console.log("Proxy server online")
})