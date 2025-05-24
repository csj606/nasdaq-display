import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './relay.tsx'
import { retrieveCompanyName, retrieveLastestPrice, nasdaqStockTickers, type Stock } from './relay.tsx'

const [stocks, setStocks] = useState<Stock[]>([])

async function getStocks(){
  for(let i = 0; i < nasdaqStockTickers.length; i++){
    const ticker: string = nasdaqStockTickers[i]
    const companyName: string = retrieveCompanyName(ticker) 
    if (i !== 0 && i % 5 === 0){
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    const price: number = await retrieveLastestPrice(ticker)
    const newStock: Stock = {symbol: ticker, recent_price: price, company_description: companyName}
    setStocks(prevStocks => [...prevStocks, newStock])
  }
}
 
async function stockCard(stock: Stock) {
  return (
    <>
      <tr>
        <td>{stock.symbol}</td>
        <td>{stock.recent_price}</td>
        <td>{stock.company_description}</td>
      </tr>
    </>
  )
}

function stockTable() {
  return (
    <>
    <table>
      <tr>
        <th>Stock Symbol</th>
        <th>Last Price</th>
        <th>Company Name</th>
      </tr>
      {stocks.map((stock) => (
        stockCard(stock)
      ))}
    </table>
    </>
  )
}

function App() {
  getStocks()
  return (
    <>
      <h1>NASDAQ 100 Daily Prices</h1>
      {stockTable()}
    </>
  )
}

export default App
