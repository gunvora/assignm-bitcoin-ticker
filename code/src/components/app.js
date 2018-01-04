import React from "react"
import { LineChart, Line, Tooltip, YAxis } from "recharts"
import openGdaxWebsocket from "../gdax-websocket"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tickerMessages: []
    }
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    newTickerMessage.price = parseFloat(newTickerMessage.price, 10)
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    return (
      <LineChart width={600} height={400} data={this.state.tickerMessages}>
        <Tooltip />
        <YAxis type="number" domain={["dataMin", "dataMax’"]} />
        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    )
  }

}

export default App
