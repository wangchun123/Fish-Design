import React from 'react';
import './index.less';

interface Iprops {}
const Loading: React.FC<Iprops> = () => {
  return (
    <div className="fish_loading">
      <div id="loading3">
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
      </div>
    </div>
  );
};

export default Loading;
