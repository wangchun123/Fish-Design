import React, { useRef, useEffect, useState } from 'react';
import './index.less';

interface ISplitScreenProps {
  topContent: React.ReactElement;
  bottomContent: React.ReactElement;
}

const SplitScreen: React.FC<ISplitScreenProps> = ({
  topContent,
  bottomContent,
}) => {
  const [height, setHeight] = useState(100);
  const dragLineRef = useRef<any>();
  const boxRef = useRef<any>();

  useEffect(() => {
    dragLineRef.current.onmousedown = function(e) {
      // 移动起点
      const pageStart = e.clientY;
      dragLineRef.current.top = dragLineRef.current.offsetTop; //赋值高度，才会感觉是在拖动

      document.onmousemove = function(ev) {
        // 移动结束点
        const pageEnd = ev.clientY;
        let moveLen = dragLineRef.current.top + (pageEnd - pageStart);
        const moveMaxLen =
          boxRef.current.clientHeight - dragLineRef.current.offsetHeight;

        //设置拖拽的范围
        if (moveLen < 100) moveLen = 100; // 最小值
        if (moveLen > moveMaxLen - 180) moveLen = moveMaxLen - 180; // 最大值

        // 设置高度
        setHeight(moveLen - 50);
      };

      // 销毁事件
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }, []);

  return (
    <div ref={boxRef}>
      <div style={{ height }} className="top">
        {topContent}
      </div>

      <div className="dragLine" ref={dragLineRef} />

      <div
        className="bottom"
        style={{
          height: `calc(100vh - ${height}px - 100px)`,
        }}
      >
        {bottomContent}
      </div>
    </div>
  );
};

export default SplitScreen;
