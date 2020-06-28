import React from 'react';
import Loding from '@/image/loding.gif';
import './index.less';

interface Iprops {}
const Loading: React.FC<Iprops> = () => {
  return (
    <div className="fish_loading">
      <img src={Loding} alt="" style={{ height: '12px' }} />
      {/* <div id="loading3">
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
        <div className="demo3"></div>
      </div> */}
    </div>
  );
};

export default Loading;
