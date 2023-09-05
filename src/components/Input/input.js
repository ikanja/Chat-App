import React, { Component } from 'react';
import './input.css';

class Input extends Component {
  state = {
    text: '',
    isMessageTooLong: false,
  };

  onChange = (e) => {
    const newText = e.target.value;
    this.setState({ text: newText, isMessageTooLong: newText.length >= 1024 });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const message = this.state.text.trim();

    if (message.length === 0) {
      return;
    }

    if (message.length <= 1024) {
      this.props.onSendMessage(message);
      this.setState({ text: '' });
    }
  };

  render() {
    const isMaxLengthReached = this.state.isMessageTooLong;

    return (
      <div className='Input-container'>
        <form onSubmit={this.onSubmit}>
          <input
            className={`Input-field ${
              isMaxLengthReached ? 'Input-field-error' : ''
            }`}
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type='text'
            placeholder='Type your message here...'
            autoFocus={true}
            maxLength={1024}
          />
          <button disabled={isMaxLengthReached}>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
