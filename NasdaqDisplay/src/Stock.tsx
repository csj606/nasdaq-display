import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getStockFundamentals, type StockFundamentals } from './relay';

function StockInfo({info}: {info: StockFundamentals[]}){
    console.log(info.length)
    if(info.length === 0){
        return(
            <div>
                <Link to="/">Back to Home</Link>
                <h1>Retrieving Company Information, Loading...</h1>
            </div>
        )
    }else{
        let fundamentals : StockFundamentals = info[0]
        return(
            <div>
                <Link to="/">Back to Home</Link>
                <h1>{fundamentals.ticker}: {fundamentals.name} - ${fundamentals.cur_price}</h1>
                <h2>Sector: {fundamentals.sector}</h2>
                <h3>Performance Metrics</h3>
                <ul>
                    <li>Year To Date Price Return: {fundamentals.yearToDatePriceReturnDaily}</li>
                    <li>YTD Return vs S&P 500: {fundamentals.priceRelativeToSP500Ytd}</li>
                </ul>
                <h3>Valuation Measures</h3>
                <ul>
                    <li>Price to Sales Ratio: {fundamentals.psTTM}</li>
                    <li>Price to Tangible Book Ratio: {fundamentals.ptbvQuarterly}</li>
                </ul>
                <h3>Profitability Ratios</h3>
                <ul>
                    <li>Return on Assets: {fundamentals.roaTTM}</li>
                    <li>Return on Equity: {fundamentals.roeTTM}</li>
                    <li>Return on Investment: {fundamentals.roiTTM}</li>
                </ul>
                <h3>Growth Metrics</h3>
                <ul>
                    <li>Revenue Growth for Past Five Years: {fundamentals.revenueGrowth5Y}</li>
                    <li>Revenue Growth Year to Year: {fundamentals.revenueGrowthQuarterlyYoy}</li>
                    <li>Revenue per Share: {fundamentals.revenuePerShare}</li>
                </ul>
                <h3>Operational Measures</h3>
                <ul>
                    <li>Quarterly Quick Ratio: {fundamentals.quickRatioQuarterly}</li>
                    <li>Receiveable Turnover TTM: {fundamentals.receivablesTurnoverTTM}</li>
                </ul>
                <h3>Balance Sheet Metrics</h3>
                <ul>
                    <li>Quarterly Total Debt to Equity Ratio: {fundamentals.totalDebtTotalEquityQuarterly}</li>
                    <li>Tangible Book Value per Share: {fundamentals.tangibleBookValuePerShareQuarterly}</li>
                </ul>
            </div>
        )
    }
}

function Stock(){
    const { ticker } = useParams()
    const [fundamentals, setFundamentals] = useState<StockFundamentals[]>([])
    useEffect(() => {
        async function dataTasks(){
            if(typeof ticker === 'undefined'){
                throw new Error("Ticker undefined");
            }       
            const retrievedInfo = await getStockFundamentals(ticker)
            console.log(retrievedInfo)
            setFundamentals([retrievedInfo])
        }
        dataTasks()
      }, [])
    return (
        <div>
            {StockInfo({info: fundamentals})}
        </div>
    )
}

export default Stock