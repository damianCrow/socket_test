import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import styled from 'styled-components';

const socket = openSocket('http://localhost:8000');

const Button = styled.button`
  position: relative;
  background-color: #05C149;
  border: none;
  font-size: 1rem;
  color: #FFFFFF;
  padding: 10px;
  border-radius: 3px;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  outline: none;
  cursor: pointer;

  &.danger {
    background-color: #C80303;
    margin-left: 1rem;
  }
`
const MessagesList = styled.ul`
  flex: 2;
  align-items: flex-start;
  max-width: 66.6666%;
  padding: 0 1rem;
  max-height: 360px;
  overflow: scroll;
  border: 3px solid #12B7F9;
  margin: calc(19px + 1rem) 3rem;

  li {
    list-style: none;
    margin: 5px 0;
    text-align: left;
    word-wrap: break-word;
    max-width: 100%;

    &.sent {
      color: #12B7F9;
    }
    &.received {
      color: #05C149;
    }

    span {
      font-size: 0.75rem;
      font-style: italic;
    }
  }
`
const BodyWrap = styled.div`
  display: flex;
  padding: 1rem;

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: Tahoma, sans-serif;

    textarea {
      padding: 1rem;
      font-size: 1rem;
      height: 350px;
      margin-bottom: 1rem;
      border: 3px solid #12B7F9;
      background-repeat: no-repeat;
    }

    label {
      text-align: left;
      margin: 0 0 1rem 1rem;
    }
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {inputValue: '', messages: []}
  }

  componentDidMount() {
    socket.on('getMessage', message => {
      console.log(message)
      this.addMessageToList(this.createMessageObj(message, 'received'))
    });
  }

  createMessageObj(messageBody, messageType) {
    return {
      time: new Date(Date.now()).toLocaleString(),
      text: messageBody,
      type: messageType
    }
  }

  sendMessage(message) {
    if(message.length) {
      console.log(`sendingMessge ${message}`)
      this.addMessageToList(this.createMessageObj(message, 'sent'))
      socket.emit('sendMessage', message,  Date.now())
    } else {
      console.log('there is no message to send.')
    }
  }

  clearMessages() {
    this.setState({messages: []})
    this.messageText.value = ''
  }

  addMessageToList(newMessage) {
    this.setState({messages: [...this.state.messages, newMessage]})
  }

  submitForm(e) {
    e.preventDefault()
    this.sendMessage(this.messageText.value)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Messaging App</h1>
        </header>
        <BodyWrap>
          <form onSubmit={(e) => this.submitForm(e)}>
            <label>Enter Message</label>
            <textarea ref={(messageText) => { this.messageText = messageText }} type="text"></textarea>
            <div>
              <Button type='submit'>
                send message
              </Button>
              <Button className="danger" onClick={() => this.clearMessages()}>
                clear messages
              </Button>
            </div>
          </form>
          <MessagesList>
            {this.state.messages.map((item, index) => {
              return <li className={item.type} key={index}><span>{item.type} @ {item.time} :</span> {item.text}</li> 
            })}
          </MessagesList>
        </BodyWrap>
      </div>
    );
  }
}

export default App