import React from "react"
import { LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import openGdaxWebsocket from "../gdax-websocket"

const data = [
  { name: "Page A", amt: 2400 },
  { name: "Page B", amt: 2210 },
  { name: "Page C", amt: 2290 },
  { name: "Page D", amt: 2000 },
  { name: "Page E", amt: 2181 },
  { name: "Page F", amt: 2500 },
  { name: "Page G", amt: 2100 }
]

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tickerMessages: []
    }
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
    this.websocket1 = openGdaxWebsocket("BTC-USD", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
    this.websocket1.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    newTickerMessage.price = parseFloat(newTickerMessage.price)
    newTickerMessage.sequence = parseFloat(newTickerMessage.sequence)
    this.setState(previousState => ({

      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])

    }))
  }

  // render() {
  //   return (
  //     <div>
  //       {this.state.tickerMessages.map(msg => (
  //         <div key={msg.sequence}>
  //           {msg.time}: <strong>{msg.price} EUR</strong>
  //         </div>
  //       ))}
  //     </div>

  render() {
    return (
      <div>
        <LineChart width={600} height={400} data={this.state.tickerMessages}>
          <Line type="monotone" dataKey="price" stroke="blue" />
          <Line type="monotone" dataKey="volume_24h" stroke="green" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend />
          <XAxis dataKey="product_id" />
          <YAxis dataKey="price" />
          <Tooltip />
        </LineChart>

        {this.state.tickerMessages.map(xx => (
          <div key={xx.sequence}>
          ...... {xx.time}:  <strong> {xx.price} </strong> {xx.product_id}
          </div>
        ))}
      </div>
    )
  }
}

export default App
