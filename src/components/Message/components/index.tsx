import React, { Component } from 'react';
import './index.less';

interface Item {
  title?: string;
  timer?: NodeJS.Timer | null;
  id?: number;
}

interface Istate {
  messages: Item[];
  id: number;
}

interface Iprops {
  ref?: object;
}

class MessageComponent extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      id: 0,
      messages: [],
    };
  }

  add = (options: Item) => {
    let { messages, id } = this.state;
    let layer = {
      id: id++,
      ...options,
    };

    layer.timer = setTimeout(() => {
      this.remove(layer);
    }, 2000);

    messages.push(layer);

    this.setState({ messages, id });
  };

  remove = (layer: any) => {
    clearTimeout(layer.timer);
    let messages = this.state.messages.filter(
      (item: any) => item.id !== layer.id,
    );
    this.setState({ messages });
  };

  render() {
    return (
      <div className="fish_message">
        {this.state.messages.map((item: Item, index) => (
          <div key={item.id} className="message">
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}

export default MessageComponent;
