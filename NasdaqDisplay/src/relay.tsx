import {restClient} from '@polygon.io/client-js';
const polyon = restClient("");

export const nasdaqStockTickers: string[] = ["MSFT", "AAPL", "NVDA", "AMZN", "AVGO", "META", "NFLX",
    "TSLA", "COST", "GOOG", "TMUS", "PLTR", "CSCO", "LIN", "ISRG", "INTU", "PEP", "AMD", "ADBE", 
    "TXN", "BKNG", "QCOM", "AMGN", "HON", "AMAT", "CMCSA", "GILD", "PANW", "MELI", "ADP", 
    "VRTX", "ADI", "APP", "LRCX", "MU", "KLAC", "CRWD", "SBUX", "MSTR", "INTC", "CEG", "CTAS",
    "CDNS", "MDLZ", "FTNT", "SNPS", "PDD", "ORLY", "DASH", "MAR", "PYPL", "ASML", "ADSK", "REGN",
    "ROP", "CPRT", "MNST", "ABNB", "CSX", "CHTR", "WDAY", "MRVL", "PAYX", "AEP", "AXON", "NXPI",
    "PCAR", "ROST", "FAST", "KDP", "EXC", "VRSK", "IDXX", "FANG", "CTSH", "CCEP", "AZN", "TTWO",
    "EA", "XEL", "ODFL", "BKR", "ZS", "TEAM", "DDOG", "TTD", "LULU", "GEHC", "KHC", "DXCM", "MCHP",
    "CSGP", "ANSS", "CDW", "WBD", "GFS", "ON", "BIIB", "ARM", "MDB"
];

export async function getStocks(): Promise<Stock[]>{
  let results: Stock[] = []
  for(let i = 0; i < nasdaqStockTickers.length; i++){
    const ticker: string = nasdaqStockTickers[i]
    const companyName: string = retrieveCompanyName(ticker)
    if (i !== 0 && i % 4 === 0){
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
    console.log("Cycle " + i.toString())
    console.log(Date.now())
    const price: number = await retrieveLastestPrice(ticker)
    const newStock: Stock = {symbol: ticker, recent_price: price, company_description: companyName}
    results.push(newStock)
  }
  return results
}

export type Stock =  {
    symbol: string;
    recent_price: number;
    company_description: string;
};

function verifyTicker(ticker: string): boolean{
    if(ticker in nasdaqStockTickers){
        return true
    }else{
        return false
    }
}

async function retrieveLastestPrice(ticker: string): Promise<number>{
    const data = await polyon.stocks.previousClose(ticker);
    try{
        if(data.results !== null){
            let resultCount = data.resultsCount!
            let closePrice = 0
            data.results?.map(result => (
                closePrice += result.c!
            ))
            let price: number = closePrice/resultCount
            return price
        }else{
            return -1
        }
    }catch(exception: any){
        console.log(exception)
        return -1
    }
}

function retrieveCompanyName(ticker: string): string{
    if(!verifyTicker(ticker)){
        return "Invaid ticker"
    }
    switch(ticker){
        case "MSFT":
            return "Microsoft"
        case "AAPL":
            return "Apple"
        case "NVDA":
            return "Nvidia"
        case "AMZN":
            return "Amazon"
        case "AVGO":
            return "Broadcom"
        case "META":
            return "Meta"
        case "NFLX":
            return "Netflix"
        case "TSLA":
            return "Tesla"
        case "COST":
            return "Costco"
        case "GOOG":
            return "Google"
        case "TMUS":
            return "T-Mobile US"
        case "PLTR":
            return "Palantir"
        case "CSCO":
            return "Cisco"
        case "LIN":
            return "Linde"
        case "ISRG":
            return "Intuitive Surgical"
        case "INTU":
            return "Intuit"
        case "PEP":
            return "PepsiCo"
        case "AMD":
            return "Advanced Micro Devices"
        case "ADBE":
            return "Adobe"
        case "VRTX":
            return "Vertex Pharmaceuticals"
        case "TXN":
            return "Texas Instruments"
        case "BKNG":
            return "Booking Holdings"
        case "QCOM":
            return "Qualcomm"
        case "AMGN":
            return "Amgen"
        case "HON":
            return "Honeywell"
        case "AMAT":
            return "Applied Materials"
        case "CMCSA":
            return "Comcast"
        case "GILD":
            return "Gilead Science"
        case "PANW":
            return "Palo Alto Networks"
        case "MELI":
            return "MercadoLibre"
        case "ADP":
            return "Automatic Data Processing"
        case "ADI":
            return "Analog Devices"
        case "APP":
            return "Applovin"
        case "LRCX":
            return "Lam Research"
        case "MU":
            return "Micron"
        case "KLAC":
            return "KLA Corporation"
        case "CRWD":
            return "CrowdStrike Holdings"
        case "SBUX":
            return "Starbucks"
        case "MSTR":
            return "MicroStrategy"
        case "INTC":
            return "Intel"
        case "CEG":
            return "Constellation Energy"
        case "CTAS":
            return "Cintas"
        case "CDNS":
            return "Cadence Design Systems"
        case "MDLZ":
            return "Mondelez International"
        case "FTNT":
            return "Fortinet"
        case "SNPS":
            return "Synopsys"
        case "PDD": 
            return "PDD Holdings"
        case "ORLY":
            return "O'Reilly Automative"
        case "DASH":
            return "DoorDash"
        case "MAR":
            return "Marriott International"
        case "PYPL":
            return "PayPal"
        case "ASML":
            return "ASML Holding"
        case "ADSK":
            return "AutoDesk"
        case"REGN":
            return "Regeneron Pharmaceuticals"
        case "ROP":
            return "Roper Technologies"
        case "CPRT":
            return "Copart Inc"
        case "MNST":
            return "Monster Beverage"
        case "ABNB":
            return "Airbnb"
        case "CSX":
            return "CSX Corporation"
        case "CHTR":
            return "Charter Communcations"
        case "WDAY":
            return "Workday"
        case "MRVL":
            return "Marvell Technology"
        case "PAYX":
            return "Paychex Inc."
        case "AEP":
            return "American Electric Power"
        case "AXON":
            return "Axon Enterprise"
        case "NXPI":
            return "NXP Semiconductors"
        case "PCAR":
            return "PACCAR Inc"
        case "ROST":
            return "Ross Stores"
        case "FAST":
            return "Fastenal"
        case "KDP":
            return "Keurig Dr. Pepper"
        case "EXC":
            return "Exelon"
        case "VRSK":
            return "Verisk Analytics"
        case "IDXX":
            return "IDEXX Laboratories"
        case "FANG":
            return "Diamondback Energy"
        case "CTSH":
            return "Cognizant Technologies"
        case "CCEP":
            return "Coca-Cola Europacific Partners"
        case "AZN":
            return "AstraZeneca"
        case "TTWO":
            return "Take Two Interactive Solutions"
        case "EA":
            return "Electronic Arts"
        case "XEL":
            return "Xcel Energy"
        case "ODFL":
            return "Old Dominion Freight Line"
        case "BKR":
            return "Baker Hughes"
        case "ZS":
            return "Zscalar"
        case "TEAM":
            return "Atlassian"
        case "DDOG":
            return "Datadog"
        case "TTD":
            return "The Trade Desk"
        case "LULU":
            return "Luluemon Atheletica"
        case "GEHC":
            return "GE HealthCare Technologies"
        case "KHC":
            return "Kraft Heinz"
        case "DXCM":
            return "DexCom"
        case "MCHP":
            return "Microchip Technologies"
        case "CSGP":
            return "CoStar"
        case "ANSS":
            return "Ansys"
        case "CDW":
            return "CDW"
        case "WBD":
            return "Warner Brothers"
        case "GFS":
            return "GlobalFoundries"
        case "ON":
            return "ON Semiconductor"
        case "BIIB":
            return "Biogen"
        case "ARM":
            return "Arm Holdings"
        case "MDB":
            return "MongoDB"
    }
    return "Invalid Ticker"
}

