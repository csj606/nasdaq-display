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

export async function getStocks(): Promise<Stock[]>{
  let results: Stock[] = []
  const port = 4266
  await fetch(`http://localhost:${port}/quotes`)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < nasdaqStockTickers.length; i++){
            const ticker: string = nasdaqStockTickers[i]
            const companyName: string = retrieveCompanyInfo(ticker, true)
            const price: number = data[ticker]
            const newStock: Stock = {symbol: ticker, recent_price: price, company_description: companyName}
            results.push(newStock)
        }
    })
  return results
}

export type StockFundamentals = {
    name: string,
    ticker: string,
    cur_price: string,
    sector: string,
    yearToDatePriceReturnDaily: number,
    priceRelativeToSP500Ytd: number,
    psTTM: number,
    ptbvQuarterly: number,
    roaTTM: number,
    roeTTM: number,
    roiTTM: number,
    revenueGrowth5Y: number,
    revenueGrowthQuarterlyYoy: number,
    revenuePerShare: number,
    quickRatioQuarterly: number,
    receivablesTurnoverTTM: number,
    totalDebtTotalEquityQuarterly: number,
    tangibleBookValuePerShareQuarterly: number
}

export async function getStockFundamentals(ticker: string): Promise<StockFundamentals>{
    const port: number = 4266
    const price = await fetch(`http://localhost:${port}/get_price?ticker=${ticker}`).then(response => response.text())
    let result: StockFundamentals = {
        name: "",
        ticker: ticker,
        cur_price: price,
        sector: "",
        yearToDatePriceReturnDaily: 0,
        priceRelativeToSP500Ytd: 0,
        psTTM: 0,
        ptbvQuarterly: 0,
        roaTTM: 0,
        roeTTM: 0,
        roiTTM: 0,
        revenueGrowth5Y: 0,
        revenueGrowthQuarterlyYoy: 0,
        revenuePerShare: 0,
        quickRatioQuarterly: 0,
        receivablesTurnoverTTM: 0,
        totalDebtTotalEquityQuarterly: 0,
        tangibleBookValuePerShareQuarterly: 0
    }
    await fetch(`http://localhost:${port}/fundamentals?ticker=${ticker}`)
        .then(response => response.json())
        .then(data => {
            result.name = retrieveCompanyInfo(ticker, true)
            result.sector = retrieveCompanyInfo(ticker, false)
            result.priceRelativeToSP500Ytd = data["priceRelativeToS&P500Ytd"]
            result.psTTM = data["psTTM"]
            result.yearToDatePriceReturnDaily = data["yearToDatePriceReturnDaily"]
            result.ptbvQuarterly = data["ptbvQuarterly"]
            result.roaTTM = data["roaTTM"]
            result.roeTTM = data["roeTTM"]
            result.roiTTM = data["roiTTM"]
            result.revenueGrowth5Y = data["revenueGrowth5Y"]
            result.revenueGrowthQuarterlyYoy = data["revenueGrowthQuarterlyYoy"]
            result.revenuePerShare = data["revenuePerShareTTM"]
            result.quickRatioQuarterly = data["quickRatioQuarterly"]
            result.receivablesTurnoverTTM = data["receivablesTurnoverTTM"]
            result.totalDebtTotalEquityQuarterly = data["totalDebt/totalEquityQuarterly"]
            result.tangibleBookValuePerShareQuarterly = data["tangibleBookValuePerShareQuarterly"]
            console.log(result)
            return result
        })
    return result
}

export type Stock =  {
    symbol: string;
    recent_price: number;
    company_description: string;
};


function retrieveCompanyInfo(ticker: string, isName: boolean): string {
    switch (ticker) {
        case "MSFT":
            if (isName) {
                return "Microsoft";
            } else {
                return "Technology";
            }
        case "AAPL":
            if (isName) {
                return "Apple";
            } else {
                return "Technology";
            }
        case "NVDA":
            if (isName) {
                return "Nvidia";
            } else {
                return "Technology";
            }
        case "AMZN":
            if (isName) {
                return "Amazon";
            } else {
                return "Consumer Cyclical";
            }
        case "AVGO":
            if (isName) {
                return "Broadcom";
            } else {
                return "Technology";
            }
        case "META":
            if (isName) {
                return "Meta";
            } else {
                return "Communication Services";
            }
        case "NFLX":
            if (isName) {
                return "Netflix";
            } else {
                return "Communication Services";
            }
        case "TSLA":
            if (isName) {
                return "Tesla";
            } else {
                return "Consumer Cyclical";
            }
        case "COST":
            if (isName) {
                return "Costco";
            } else {
                return "Consumer Defensive";
            }
        case "GOOG":
            if (isName) {
                return "Google";
            } else {
                return "Communication Services";
            }
        case "TMUS":
            if (isName) {
                return "T-Mobile US";
            } else {
                return "Communication Services";
            }
        case "PLTR":
            if (isName) {
                return "Palantir";
            } else {
                return "Technology";
            }
        case "CSCO":
            if (isName) {
                return "Cisco";
            } else {
                return "Technology";
            }
        case "LIN":
            if (isName) {
                return "Linde";
            } else {
                return "Basic Materials";
            }
        case "ISRG":
            if (isName) {
                return "Intuitive Surgical";
            } else {
                return "Healthcare";
            }
        case "INTU":
            if (isName) {
                return "Intuit";
            } else {
                return "Technology";
            }
        case "PEP":
            if (isName) {
                return "PepsiCo";
            } else {
                return "Consumer Defensive";
            }
        case "AMD":
            if (isName) {
                return "Advanced Micro Devices";
            } else {
                return "Technology";
            }
        case "ADBE":
            if (isName) {
                return "Adobe";
            } else {
                return "Technology";
            }
        case "VRTX":
            if (isName) {
                return "Vertex Pharmaceuticals";
            } else {
                return "Healthcare";
            }
        case "TXN":
            if (isName) {
                return "Texas Instruments";
            } else {
                return "Technology";
            }
        case "BKNG":
            if (isName) {
                return "Booking Holdings";
            } else {
                return "Consumer Cyclical";
            }
        case "QCOM":
            if (isName) {
                return "Qualcomm";
            } else {
                return "Technology";
            }
        case "AMGN":
            if (isName) {
                return "Amgen";
            } else {
                return "Healthcare";
            }
        case "HON":
            if (isName) {
                return "Honeywell";
            } else {
                return "Industrials";
            }
        case "AMAT":
            if (isName) {
                return "Applied Materials";
            } else {
                return "Technology";
            }
        case "CMCSA":
            if (isName) {
                return "Comcast";
            } else {
                return "Communication Services";
            }
        case "GILD":
            if (isName) {
                return "Gilead Science";
            } else {
                return "Technology";
            }
        case "PANW":
            if (isName) {
                return "Palo Alto Networks";
            } else {
                return "Technology";
            }
        case "MELI":
            if (isName) {
                return "MercadoLibre";
            } else {
                return "Consumer Cyclical";
            }
        case "ADP":
            if (isName) {
                return "Automatic Data Processing";
            } else {
                return "Technology";
            }
        case "ADI":
            if (isName) {
                return "Analog Devices";
            } else {
                return "Technology";
            }
        case "APP":
            if (isName) {
                return "Applovin";
            } else {
                return "Communication Services";
            }
        case "LRCX":
            if (isName) {
                return "Lam Research";
            } else {
                return "Technology";
            }
        case "MU":
            if (isName) {
                return "Micron";
            } else {
                return "Technology";
            }
        case "KLAC":
            if (isName) {
                return "KLA Corporation";
            } else {
                return "Technology";
            }
        case "CRWD":
            if (isName) {
                return "CrowdStrike Holdings";
            } else {
                return "Technology";
            }
        case "SBUX":
            if (isName) {
                return "Starbucks";
            } else {
                return "Consumer Cyclical";
            }
        case "MSTR":
            if (isName) {
                return "MicroStrategy";
            } else {
                return "Technology";
            }
        case "INTC":
            if (isName) {
                return "Intel";
            } else {
                return "Technology";
            }
        case "CEG":
            if (isName) {
                return "Constellation Energy";
            } else {
                return "Utilities";
            }
        case "CTAS":
            if (isName) {
                return "Cintas";
            } else {
                return "Industrials";
            }
        case "CDNS":
            if (isName) {
                return "Cadence Design Systems";
            } else {
                return "Technology";
            }
        case "MDLZ":
            if (isName) {
                return "Mondelez International";
            } else {
                return "Consumer Defensive";
            }
        case "FTNT":
            if (isName) {
                return "Fortinet";
            } else {
                return "Technology";
            }
        case "SNPS":
            if (isName) {
                return "Synopsys";
            } else {
                return "Technology";
            }
        case "PDD":
            if (isName) {
                return "PDD Holdings";
            } else {
                return "Consumer Cyclical";
            }
        case "ORLY":
            if (isName) {
                return "O'Reilly Automative";
            } else {
                return "Consumer Cyclical";
            }
        case "DASH":
            if (isName) {
                return "DoorDash";
            } else {
                return "Consumer Cyclical";
            }
        case "MAR":
            if (isName) {
                return "Marriott International";
            } else {
                return "Consumer Cyclical";
            }
        case "PYPL":
            if (isName) {
                return "PayPal";
            } else {
                return "Financial";
            }
        case "ASML":
            if (isName) {
                return "ASML Holding";
            } else {
                return "Technology";
            }
        case "ADSK":
            if (isName) {
                return "AutoDesk";
            } else {
                return "Technology";
            }
        case "REGN":
            if (isName) {
                return "Regeneron Pharmaceuticals";
            } else {
                return "Healthcare";
            }
        case "ROP":
            if (isName) {
                return "Roper Technologies";
            } else {
                return "Technology";
            }
        case "CPRT":
            if (isName) {
                return "Copart Inc";
            } else {
                return "Industrials";
            }
        case "MNST":
            if (isName) {
                return "Monster Beverage";
            } else {
                return "Consumer Defensive";
            }
        case "ABNB":
            if (isName) {
                return "Airbnb";
            } else {
                return "Consumer Cyclical";
            }
        case "CSX":
            if (isName) {
                return "CSX Corporation";
            } else {
                return "Industrials";
            }
        case "CHTR":
            if (isName) {
                return "Charter Communications";
            } else {
                return "Communication Services";
            }
        case "WDAY":
            if (isName) {
                return "Workday";
            } else {
                return "Technology";
            }
        case "MRVL":
            if (isName) {
                return "Marvell Technology";
            } else {
                return "Technology";
            }
        case "PAYX":
            if (isName) {
                return "Paychex Inc.";
            } else {
                return "Technology";
            }
        case "AEP":
            if (isName) {
                return "American Electric Power";
            } else {
                return "Utilities";
            }
        case "AXON":
            if (isName) {
                return "Axon Enterprise";
            } else {
                return "Industrials";
            }
        case "NXPI":
            if (isName) {
                return "NXP Semiconductors";
            } else {
                return "Technology";
            }
        case "PCAR":
            if (isName) {
                return "PACCAR Inc";
            } else {
                return "Industrials";
            }
        case "ROST":
            if (isName) {
                return "Ross Stores";
            } else {
                return "Consumer Cyclical";
            }
        case "FAST":
            if (isName) {
                return "Fastenal";
            } else {
                return "Industrials";
            }
        case "KDP":
            if (isName) {
                return "Keurig Dr. Pepper";
            } else {
                return "Consumer Defensive";
            }
        case "EXC":
            if (isName) {
                return "Exelon";
            } else {
                return "Utilities";
            }
        case "VRSK":
            if (isName) {
                return "Verisk Analytics";
            } else {
                return "Industrials";
            }
        case "IDXX":
            if (isName) {
                return "IDEXX Laboratories";
            } else {
                return "Healthcare";
            }
        case "FANG":
            if (isName) {
                return "Diamondback Energy";
            } else {
                return "Energy";
            }
        case "CTSH":
            if (isName) {
                return "Cognizant Technologies";
            } else {
                return "Technology";
            }
        case "CCEP":
            if (isName) {
                return "Coca-Cola Europacific Partners";
            } else {
                return "Consumer Defensive";
            }
        case "AZN":
            if (isName) {
                return "AstraZeneca";
            } else {
                return "Technology";
            }
        case "TTWO":
            if (isName) {
                return "Take Two Interactive Solutions";
            } else {
                return "Communication Services";
            }
        case "EA":
            if (isName) {
                return "Electronic Arts";
            } else {
                return "Communication Services";
            }
        case "XEL":
            if (isName) {
                return "Xcel Energy";
            } else {
                return "Utilities";
            }
        case "ODFL":
            if (isName) {
                return "Old Dominion Freight Line";
            } else {
                return "Industrials";
            }
        case "BKR":
            if (isName) {
                return "Baker Hughes";
            } else {
                return "Energy";
            }
        case "ZS":
            if (isName) {
                return "Zscalar";
            } else {
                return "Technology";
            }
        case "TEAM":
            if (isName) {
                return "Atlassian";
            } else {
                return "Technology";
            }
        case "DDOG":
            if (isName) {
                return "Datadog";
            } else {
                return "Technology";
            }
        case "TTD":
            if (isName) {
                return "The Trade Desk";
            } else {
                return "Communication Services";
            }
        case "LULU":
            if (isName) {
                return "Luluemon Atheletica";
            } else {
                return "Consumer Cyclical";
            }
        case "GEHC":
            if (isName) {
                return "GE HealthCare Technologies";
            } else {
                return "Healthcare";
            }
        case "KHC":
            if (isName) {
                return "Kraft Heinz";
            } else {
                return "Consumer Defensive";
            }
        case "DXCM":
            if (isName) {
                return "DexCom";
            } else {
                return "Healthcare";
            }
        case "MCHP":
            if (isName) {
                return "Microchip Technologies";
            } else {
                return "Technology";
            }
        case "CSGP":
            if (isName) {
                return "CoStar";
            } else {
                return "Real Estate";
            }
        case "ANSS":
            if (isName) {
                return "Ansys";
            } else {
                return "Technology";
            }
        case "CDW":
            if (isName) {
                return "CDW";
            } else {
                return "Technology";
            }
        case "WBD":
            if (isName) {
                return "Warner Brothers";
            } else {
                return "Communication Services";
            }
        case "GFS":
            if (isName) {
                return "GlobalFoundries";
            } else {
                return "Technology";
            }
        case "ON":
            if (isName) {
                return "ON Semiconductor";
            } else {
                return "Technology";
            }
        case "BIIB":
            if (isName) {
                return "Biogen";
            } else {
                return "Technology";
            }
        case "ARM":
            if (isName) {
                return "Arm Holdings";
            } else {
                return "Technology";
            }
        case "MDB":
            if (isName) {
                return "MongoDB";
            } else {
                return "Technology";
            }
    }
    return "Invalid Ticker";
}