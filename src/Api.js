import openSocket from 'socket.io-client';
import React, { Component } from 'react';
import App from './App';
const socket = openSocket('http://localhost:8000');

class ApiConnectedApp extends Component {
  constructor(props) {
    super(props)
    this.state = {receivedMessage: ''}
  }

  componentDidMount() {
    socket.on('getMessage', message => {
      this.setState({receivedMessage: message})
    });
  }

  emitViaSocket(message) {
    socket.emit('sendMessage', message,  Date.now())
  }

  render() {
    return (
     	<App messageRecieved={this.state.receivedMessage} sendViaSocket={this.emitViaSocket} />
    );
  }
}

export default ApiConnectedApp
