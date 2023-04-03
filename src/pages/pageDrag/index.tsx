import React, { useRef, useEffect, useState } from 'react';
import './index.less';

const Demo = () => {
  const [height, setHeight] = useState('100px');
  const dragLineRef = useRef<any>();

  useEffect(() => {
    dragLineRef.current.onmousedown = function(e) {
      const pageStart = e.clientY;
      // dragLineRef.current.top = dragLineRef.current!.offsetTop

      document.onmousemove = function(ev) {
        const pageEnd = ev.clientY;
        const moveLen = pageEnd - pageStart;

        console.log('moveLen', moveLen);

        setHeight(moveLen);
        console.log('pageEnd,pageStart', pageEnd, pageStart);
      };

      // 销毁事件
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }, []);

  return (
    <>
      <div style={{ height, border: '1px solid red' }}>top</div>

      <div className="dragLine" ref={dragLineRef} />

      <div className="bottom">bottom</div>
    </>
  );
};

export default Demo;
