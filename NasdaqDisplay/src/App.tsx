import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './relay.tsx'
import { retrieveCompanyName, retrieveLastestPrice, nasdaqStockTickers } from './relay.tsx'
 
async function stockCard(ticker: string) {
  const price = await retrieveLastestPrice(ticker)
  const fullName = retrieveCompanyName(ticker)
  return (
    <>
      <tr>
        <td>{ticker}</td>
        <td>{price.recent_price}</td>
        <td>{fullName}</td>
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
      {nasdaqStockTickers.map((ticker) => (
        stockCard(ticker)
      ))}
    </table>
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>NASDAQ 100 Daily Prices</h1>
      {stockTable()}
    </>
  )
}

export default App
