import React, { Component } from 'react'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

// const sendMessage = (message) => {
// 	console.log(`sendMessge${message}`)
// 	socket.emit('sendMessage', message)
// } 

// socket.on('getMessage', messageText => {
// 	console.log(messageText)
// 	// callBack(messageText)
// });

// export { sendMessage }









// THIS IS CURRENTLY DOING NOTHING


export const socketsYo = (ConnectedComp) => {
  class GoogleUsersWrapper extends Component {

    componentDidMount() {
			socket.on('getMessage', message => {
				console.log(message)
				this.setState({message})
				// callBack(messageText)
			});
    }

		sendMessage(message) {
			console.log(`sendMessge${message}`)
			socket.emit('sendMessage', message)
		} 


    render() {
      return (
        <ConnectedComp {...this.props} />
      )
    }

  }
}

