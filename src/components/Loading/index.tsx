import React from 'react';
import Loding from '@/image/loading/loding.gif';

import './index.less';

interface Iprops {}
const Loading: React.FC<Iprops> = () => {
  return (
    <div className="fish_loading">
      <img src={Loding} alt="" style={{ height: '12px' }} />
    </div>
  );
};

export default Loading;
