import React, { Component } from 'react';
// import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

export default class MessagesField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      messages: [
        {
          user: 'Loontik',
          text: 'Hi'
        },
        {
          user: null,
          text: 'Hello'
        },
        {
          user: 'Loontik',
          text: 'How are you?'
        },
        {
          user: null,
          text: 'Fine'
        },
      ],
      counter: 0
    };
  }

  handleSend = (evt) => {
    this.setState({
      text: '',
      messages: [...this.state.messages, {
        user: this.props.user,
        text: this.state.text
      }]
    });
  };

  handleChange = (evt) => {
    evt.keyCode !== 13 ?
      this.setState({ text: evt.target.value }) :
      this.handleSend(evt);
  };

  componentDidUpdate(prevProps , prevState) {
    if (!this.state.messages[this.state.messages.length - 2].user && this.state.messages.length - prevState.messages.length == 1) {
      setTimeout(() => {
        this.setState({
          messages: [...this.state.messages, {
            user: null,
            text: 'Hello! I am Bot! And I can do this only'
          }]
        });
      }, 1000);
    }
  }

  render() {
    let { messages } = this.state;
    let msgArr = messages.map((msg, i) => {
      return (<Message text={msg.text} sender={msg.user} key={i} />)
    });

    return (<div className="d-flex flex-column w-50">
      <div>
        {msgArr}
      </div>
      <hr />
      <div className="controls d-flex w-100">
        <input
          type="text"
          className="w-75"
          onChange={this.handleChange}
          onKeyUp={this.handleChange}
          value={this.state.text}
        />
        <button className="ml-3" onClick={this.handleSend}>Send</button>
      </div>
    </div>)
  }
}