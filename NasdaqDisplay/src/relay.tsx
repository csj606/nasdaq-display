import {restClient} from '@polygon.io/client-js';
const polyon = restClient("");

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

type Stock =  {
    symbol: string;
    recent_price: number;
};

function verifyTicker(ticker: string): boolean{
    if(ticker in nasdaqStockTickers){
        return true
    }else{
        return false
    }
}

async function retrieveLastestPrice(ticker: string): Promise<Stock>{
    if(!verifyTicker(ticker)){
        return {symbol: "Invalid Stock Symbol", recent_price: -1}
    }
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

