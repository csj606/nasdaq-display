import { useState, useEffect } from 'react'
import './App.css'
import './relay.tsx'
import { getStocks, type Stock } from './relay.tsx'
import { Link } from 'react-router-dom';
 
function stockCard({stock}: {stock: Stock}) {
  const path = `/stock/${stock.symbol}`
  return (
    <tr>
      <td><Link to={path} >{stock.symbol}</Link></td>
      <td>{`$${stock.recent_price}`}</td>
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
