import React from 'react';
import ReactDOM from 'react-dom';
import MessageComponent from './components/index';

interface Item {
  title?: string;
  timer?: NodeJS.Timer | null;
  id?: number;
}

interface Msg {
  refs?: any;
}

class Msg {
  static getInstance: () => any;
  constructor() {
    let myRef = { current: '' };
    const div = document.createElement('div');
    document.body.append(div);
    ReactDOM.render(<MessageComponent ref={myRef} />, div);
    this.refs = myRef;
  }

  public success(options: Item) {
    this.refs.current.add({ ...options, type: 'success' });
  }

  public error(options: Item) {
    this.refs.current.add({ ...options, type: 'error' });
  }
}

Msg.getInstance = (function() {
  let instance: any;
  return function() {
    if (!instance) {
      instance = new Msg();
    }
    return instance;
  };
})();

const Message = Msg.getInstance();
export default Message;
