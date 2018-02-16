import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { socketsYo } from './api'
// import { sendMessage as sendToBack } from './api';
import styled from 'styled-components';

const Message = styled.p`
  font-size: 1rem;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {inputValue: ''}
    // this.handleChange = this.handleChange.bind(this)
    // this.test = new Promise((resolve, reject) => {
      // console.log('sending message to the back')
    // })
  }

  handleChange() {
    // this.setState({inputValue: this.messageText.value});
  }

  // sendMessage() {
  //   console.log('send message thing')
  //   sendToBack(this.messageText.value)
  //   // sendToBack(this.state.inputValue, message => resolve(message))
  //   // this.test.then(message => this.setState({inputValue: message}))
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Messaging App</h1>
        </header>
        <input ref={(messageText) => { this.messageText = messageText }} onChange={this.handleChange} type="text"/>
        <Message>{this.state.inputValue}</Message>
        <button onClick={() => this.sendMessage(this.messageText.value)}>
          Send!
        </button>
      </div>
    );
  }
}

export default socketsYo(App);