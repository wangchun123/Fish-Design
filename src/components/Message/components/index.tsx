import React, { Component } from 'react';
import Icon from '@/components/Icon';

import './index.less';

interface Item {
  title?: string;
  timer?: NodeJS.Timer | null;
  id?: number;
  type?: string;
}

interface Istate {
  messages: Item[];
  id: number;
  type: any;
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
      type: '',
    };
  }

  add = (options: Item) => {
    let { messages, id, type } = this.state;

    let layer = {
      id: id++,
      ...options,
    };

    layer.timer = setTimeout(() => {
      this.remove(layer);
    }, 2000);

    messages.push(layer);

    this.setState({ messages, id, type: options.type });
  };

  remove = (layer: any) => {
    clearTimeout(layer.timer);
    let messages = this.state.messages.filter(
      (item: any) => item.id !== layer.id,
    );
    this.setState({ messages });
  };

  render() {
    const { messages, type } = this.state;

    return (
      <div className="fish_message">
        {messages.map((item: Item, index) => (
          <div key={item.id} className="message">
            <Icon type={type} />
            &nbsp;
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}

export default MessageComponent;
