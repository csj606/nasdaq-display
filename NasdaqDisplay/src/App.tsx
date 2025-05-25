import { useState, useEffect } from 'react'
import './App.css'
import './relay.tsx'
import { getStocks, type Stock } from './relay.tsx'

 
function stockCard({stock}: {stock: Stock}) {
  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>{stock.recent_price}</td>
      <td>{stock.company_description}</td>
    </tr>
  )
} 

function stockTable({stocks}: {stocks: Stock[]}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock Symbol</th>
          <th>Last Price</th>
          <th>Company Name</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
        stockCard({stock})
      ))}
      </tbody>
    </table>
  )
}

function App() {
  const [stocks, setStocks] = useState<Stock[]>([])

  useEffect(() => {
    async function dataTasks(){
      const retrievedStocks = await getStocks()
      setStocks(retrievedStocks)
    }
    console.log("This rendered")
    dataTasks()
  }, [])
  return (
    <>
      <h1>NASDAQ 100 Daily Prices</h1>
      {stockTable({stocks: stocks})}
    </>
  )
}

export default App
